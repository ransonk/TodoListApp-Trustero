from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Task


task_routes = Blueprint('tasks', __name__)


@task_routes.route('/all_tasks')
def get_tasks():
    tasks = Task.query.all()
    return {"tasks": [task.to_dict() for task in tasks]}

@task_routes.route('/<name>')
def get_single_task(name):
    task = Task.query.filter_by(name=name).first()
    comments = task.return_comments()
    print(comments)
    return {"comments": task.to_dict()}
