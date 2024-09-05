# routes.py
from app import app, db, bcrypt
from models import User, Course, Assignment, Test
from flask import request, jsonify

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'})

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Adding a course
@app.route('/courses/add', methods=['POST'])
def add_course():
    data = request.json
    new_course = Course(
        course_name=data['course_name'],
        course_code=data['course_code'],
        user_id=data['user_id']
    )
    db.session.add(new_course)
    db.session.commit()
    return jsonify({'message': 'Course added successfully'})

# Adding an assignment
@app.route('/assignments/add', methods=['POST'])
def add_assignment():
    data = request.json
    new_assignment = Assignment(
        assignment_name=data['assignment_name'],
        due_date=data['due_date'],
        weight=data['weight'],
        grade=data.get('grade'),  # This can be updated later
        course_id=data['course_id']
    )
    db.session.add(new_assignment)
    db.session.commit()
    return jsonify({'message': 'Assignment added successfully'})

@app.route('/tests/add', methods=['POST'])
def add_test():
    data = request.json
    new_test = Test(
        test_name=data['test_name'],
        due_date=data['due_date'],
        weight=data['weight'],
        grade=data.get('grade'),  # This can be updated later if not provided
        course_id=data['course_id']  # Ensure course_id corresponds to an existing course
    )
    db.session.add(new_test)
    db.session.commit()
    return jsonify({'message': 'Test added successfully'})