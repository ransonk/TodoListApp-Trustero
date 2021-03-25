from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class Comment(db.Model, UserMixin):
    __tablename__ = "comments"

    id = db.Column(db.Integer, primary_key = True)
    description = db.Column(db.String(255), nullable=False)
    task_id = db.Column(db.Integer, db.ForeignKey("tasks.id"))
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
        )

    task = db.relationship(
        "Task",
        back_populates="comments"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
