from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import pdfplumber

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/uoft_coursesync'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)  # For password hashing

# Initialize OpenAI client with the correct API key
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.route('/')
def home():
    return "Welcome to UofT-CourseSync Backend!"

@app.route('/api/extract-syllabus', methods=['POST'])
def extract_syllabus():
    print("Received files:", request.files)  # Log what files are actually received
    if 'syllabus' not in request.files:
        print("Error: 'syllabus' key not found in request.files.")
        return jsonify({"error": "No file part"}), 400

    file = request.files['syllabus']

    try:
        # Use pdfplumber to read the PDF file and extract text
        with pdfplumber.open(file) as pdf:
            syllabus_text = ""
            for page in pdf.pages:
                syllabus_text += page.extract_text() or ""

        # Create the prompt to extract assignments and tests
        prompt = f"""
        Extract the course name, code, term, assignments, tests, extra_info which is any info about the "type" which can can be found in the syllabus text, due dates, time(if there is a time write it, if there is no just put 11:59 p.m.), and weights from the following syllabus text:

        {syllabus_text}

        Return the data in the following JSON format:
        [
            {{
                "course_name": "Computer Organization",
                "course_code": "CSC258H5F",
                "term": "Fall 2024",
                "type": "Lab",
                "description": "7 practical assignments to be completed in lab time.",
                "extra_info": "2% each, best 6 counted. We will not have a lab (practical) every week. Labs will be posted by the beginning of the week (by Tuesday), and the TAs will provide support in the scheduled lab sessions on Thursday and Friday. In each lab, you will complete some task -- writing assembly, for example -- and will have your work checked during the lab period by the TAs. While you may complete the lab ahead of time on your own machine, you must attend lab to demonstrate your work to the TAs."
                "due_date": "2024-10-18",
                "time": "7:15-8:15 p.m."
                "weight": "12%"
            }},
            ...
        ]
        """

        # Updated API call with the correct method
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ]
        )

        extracted_data = completion.choices[0].message.content.strip()
        return jsonify({"data": extracted_data})

    except Exception as e:
        print("Error details:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
