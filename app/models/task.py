from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Task(db.Model, UserMixin):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    status = db.Column(db.Boolean, nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey("lists.id"))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
        )

    list = db.relationship(
        "List",
        back_populates="tasks"
    )

    comments = db.relationship(
        "Comment",
        cascade="all, delete-orphan",
        back_populates="task"
    )

    def return_comments(self):
         return {
            "comments": [comment.to_dict() for comment in self.comments]
        }

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "status": self.status,
            "list_id": self.list_id,
            "comments": [comment.to_dict() for comment in self.comments]
        }
