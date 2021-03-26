from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Optional
from app.models import Comment


class CreateCommentForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
    task_id = IntegerField('task_id')
