from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class List(db.Model, UserMixin):
    __tablename__ = "lists"

    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(255), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        server_onupdate=db.func.now()
        )

    tasks = db.relationship(
        "Task",
        cascade="all, delete-orphan",
        back_populates="list"
    )


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
        }
