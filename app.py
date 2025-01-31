from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import pdfplumber

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

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
        Extract the assignments, tests, due dates, and weights from the following syllabus text:

        {syllabus_text}

        Return the data in the following JSON format:
        [
            {{
                "type": "Assignment",
                "name": "Stellarium Mini-Project 1: cycles of the sky",
                "due_date": "2024-05-15",
                "weight": "10%"
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
