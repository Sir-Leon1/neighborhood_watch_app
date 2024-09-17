#!/usr/bin/python3
"""User specific settings"""

from backend.app.models import dbase
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, backref


class Settings(dbase.Dbase, dbase.Base):
    """Represents user settings"""

    __tablename__ = 'settings'

    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    notifs_enabled = Column(Boolean, default=True)
    location_tracking_enabled = Column(Boolean, default=False)
    dark_mode = Column(Boolean, default=False)

    user = relationship('User', backref=backref('settings', lazy=True))

    def __repr__(self):
        """Provides string representation of the Settings object"""
        return f'<Settings {self.user_id}>'
