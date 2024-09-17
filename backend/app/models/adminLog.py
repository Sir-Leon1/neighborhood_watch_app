#!/usr/bin/python3
""" holds class AdminLog"""

from backend.app.models import dbase
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import relationship, backref


class AdminLog(dbase.Dbase, dbase.Base):
    """Represents an admin log"""

    __tablename__ = 'admin_logs'

    admin_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    action = Column(String(200), nullable=False)

    admin = relationship('User', backref=backref('admin_logs', lazy=True))

    def __repr__(self):
        """Provides string representation of the AdminLog object"""
        return f'<AdminLog {self.action}>'
