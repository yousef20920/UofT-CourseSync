# models.py
from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    courses = db.relationship('Course', backref='user', lazy=True)

class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    course_name = db.Column(db.String(100), nullable=False)
    course_code = db.Column(db.String(20), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    assignments = db.relationship('Assignment', backref='course', lazy=True)
    tests = db.relationship('Test', backref='course', lazy=True)

class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    assignment_name = db.Column(db.String(100), nullable=False)
    due_date = db.Column(db.Date, nullable=True)
    weight = db.Column(db.Numeric(5, 2), nullable=True)
    grade = db.Column(db.Numeric(5, 2), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    test_name = db.Column(db.String(100), nullable=False)
    due_date = db.Column(db.Date, nullable=True)
    weight = db.Column(db.Numeric(5, 2), nullable=True)
    grade = db.Column(db.Numeric(5, 2), nullable=True)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'), nullable=False)
