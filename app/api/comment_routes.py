from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Comment
from app.forms import CreateCommentForm

comment_routes = Blueprint('comments', __name__)


@comment_routes.route('/all_comments')
def get_comments():
    comments = Comment.query.all()
    return {"comments": [comment.to_dict() for comment in comments]}

@comment_routes.route('/add-comment/<int:id>', methods=["POST"])
def add_comment(id):

    form = CreateCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            description=form.data['description'],
            task_id=id
        )
        db.session.add(comment)
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}

@comment_routes.route('/delete-comment/<int:id>', methods=["GET", "DELETE"])
#this one ->>>>>>>>>>>
# @login_required
def delete_comment(id):

    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return {'message':'delete successful'}
