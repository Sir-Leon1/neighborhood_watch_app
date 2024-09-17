#!/usr/bin/python3
""" holds class User"""

from backend.app.models import dbase
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship


class User(dbase.Dbase, dbase.Base):
    """Representation of a user"""

    __tablename__ = 'users'
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password_hash = Column(String(500), nullable=False)
    user_type = Column(String(60), nullable=False)
    phone_no = Column(String(20), unique=True, nullable=False)

    reports = relationship('Incident', backref='author', lazy=True)

    def set_password(self, password):
        """Sets user's password by hashing it"""
        self.pwd_hash = generate_password_hash(password)

    def check_password(self, password):
        """Checks if a given pwd matches the stored pwd"""
        return check_password_hash(self.pwd_hash, password)

    def __repr__(self):
        """Provides string representation of the User object"""
        return f'<User {self.username}>'
