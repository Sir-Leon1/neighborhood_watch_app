#!/usr/bin/python3
""" holds class Notification"""

from backend.app.models import dbase
from sqlalchemy import Column, Integer, String, ForeignKey, text, func, DateTime
from sqlalchemy.orm import relationship, backref


class Notification(dbase.Dbase, dbase.Base):
    """Represents a notification"""

    __tablename__ = 'notifications'

    message = Column(String(200), nullable=False)
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    incident_id = Column(String(60), ForeignKey('incident.id'), nullable=True)

    user = relationship('User', backref=backref('notifications', lazy=True))
    incident = relationship('Incident', backref=backref('notifications', lazy=True))

    def __repr__(self):
        """Provides string representation of the Notification object"""
        return f'<Notification {self.message}>'
