#!/usr/bin/python3
from sqlalchemy.exc import IntegrityError, PendingRollbackError
from backend.app.models import user, dbase
from werkzeug.security import generate_password_hash, check_password_hash
from flask import abort
from backend.app.schemas.user_schema import user_schema, users_schema
from backend.app.models import storage
from backend.app.models.engine.storage import CNC


class AdminService:

    @staticmethod
    def get_overview():
        """
        Get an overview of the system
        """
        total_users = storage.all(CNC['User']).count()
        total_incidents = storage.all(CNC['Incident']).count()
        total_notifications = storage.all(CNC['Notification']).count()
        return {
            'total_users': total_users,
            'total_incidents': total_incidents,
            'total_notifications': total_notifications
        }

