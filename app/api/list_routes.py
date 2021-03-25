from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import List

list_routes = Blueprint('lists', __name__)


@list_routes.route('/all_lists')
def get_lists():
    lists = List.query.all()
    return {"lists": [list.to_dict() for list in lists]}
