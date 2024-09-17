#!/usr/bin/python3
from sqlalchemy.exc import IntegrityError, PendingRollbackError
from flask import abort
from backend.app.models import storage
from backend.app.schemas.notification_schema import notification_schema, notifications_schema
from backend.app.models.engine.storage import CNC


class NotificationService:

    @staticmethod
    def create_notification(data, user_id):
        """
        Create a new notification
        """
        if data is None:
            abort(400, 'Not valid data')

        errors = notification_schema.validate(data)
        if errors:
            abort(400, str(errors))

        notification = CNC.get('Notification')
        if notification is None:
            return None
        new_notification = notification(
            title=data['title'],
            message=data['message'],
            user_id=data['user_id']
        )
        try:
            new_notification.save()
        except IntegrityError as e:
            abort(400, 'An error occurred while creating the notification')
        except PendingRollbackError:
            storage.rollback()
            abort(400, 'A database error occurred. Please try again')
        return new_notification.to_dict()

    @staticmethod
    def get_notification_by_id(notification_id):
        notification = storage.get('Notification', notification_id, None)
        if notification is None:
            abort(404, 'Notification not found')
        return notification.to_dict()

    @staticmethod
    def update_notification(data, notification_id):
        if data is None:
            abort(400, 'Not valid data')
        notification = storage.get('Notification', notification_id, None)
        if notification is None:
            abort(404, 'Notification not found')
        for k, v in data.items():
            if k not in ['id', 'created_at', 'updated_at']:
                setattr(notification, k, v)
        storage.save()
        return notification.to_dict()

    @staticmethod
    def delete_notification(notification_id):
        notification = storage.get('Notification', notification_id, None)
        if notification is None:
            abort(404, 'Notification not found')
        storage.delete(notification)
        storage.save()
        return {}

    @staticmethod
    def all_notifications():
        notifications = storage.all('Notification')
        if notifications is None:
            abort(404, 'Notifications not found')
        return [notification.to_dict() for notification in notifications.values()]


    @staticmethod
    def get_notifications_by_user(user_id):
        notifications = storage.get('Notification', user_id, None)
        if notifications is None:
            abort(404, 'Notification not found')
        return notifications.to_dict()
