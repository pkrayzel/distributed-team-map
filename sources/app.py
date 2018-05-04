from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

data = json.load(open('data/employees.json'))


@app.route('/')
def hello_world():
    return render_template('index.html')


@app.route('/employee/<email>')
def employee_detail(email):
    employee = find_employee(email)

    if not employee:
        return f"<strong>Employee with email: {email} has not been found!</strong>"

    return render_template('employee.html', employee=employee)


@app.route('/data/employees.json')
def api_employees():
    return jsonify(data)


def find_employee(email):
    for item in data:
        if item['email'] == email:
            return item

    return None