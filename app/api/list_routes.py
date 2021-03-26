from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, List

list_routes = Blueprint('lists', __name__)


@list_routes.route('/all_lists')
def get_lists():
    lists = List.query.all()
    return {"lists": [list.to_dict() for list in lists]}

@list_routes.route("/update-list/<int:id>", methods=["GET", "PUT"])
def updateClient(id):
    list = List.query.get(id)
    req_data = request.get_json()
    list.name = req_data['name']
    db.session.add(list)
    db.session.commit()
    return list.to_dict()

@list_routes.route('/delete-list/<int:id>', methods=["GET", "DELETE"])
def delete_workout(id):
    list = List.query.get(id)
    db.session.delete(list)
    db.session.commit()
    return {'message':'delete successful'}
