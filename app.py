from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
import pdfplumber
import mysql.connector

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# MySQL Database Configuration
db_config = {
    'host': 'localhost',  # Replace with your MySQL host
    'user': 'root',       # Replace with your MySQL username
    'password': 'UOFT@2026',  # Replace with your MySQL password
    'database': 'uoft_coursesync',  # Replace with your database name
}


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

# Example route to fetch all users
@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        cursor = mysql.connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        cursor.close()
        return jsonify(users)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/add-user', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    try:
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        query = "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (name, email, password))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "User added successfully!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
