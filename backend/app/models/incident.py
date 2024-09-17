#!/usr/bin/python3
""" holds class Incident"""

from backend.app.models import dbase
from sqlalchemy import Column, Integer, String, ForeignKey, text, func, DateTime
from sqlalchemy.orm import relationship, backref


class Incident(dbase.Dbase, dbase.Base):
    """Represents an incident"""

    __tablename__ = 'incident'

    title = Column(String(200), nullable=False)
    description = Column(String(1080), nullable=False)
    location = Column(String(200), nullable=False)
    reported_by = Column(String(60), ForeignKey('users.id'), nullable=False)
    status = Column(String(50), default='Open')

    reporter = relationship('User', backref=backref('incident'), lazy=True, overlaps="author,reports", viewonly=True)
