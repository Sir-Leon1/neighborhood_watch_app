#!/usr/bin/python3

from backend.app.api import app_route
from flask import abort, jsonify, request
from backend.app.models import storage
from backend.app.models.engine.storage import CNC
from backend.app.schemas.user_schema import user_schema, users_schema
from backend.app.services.notification_service import NotificationService


@app_route.route('/users/<user_id>/notifications', methods=['GET', 'POST'])
def notifications_no_id(user_id):
    """
    Route to handle geting and creating
    new notifications
    """
    if request.method == 'GET':
        notifications = NotificationService.get_notifications_by_user(user_id)
        return jsonify(notifications), 200

    if request.method == 'POST':
        data = request.get_json()
        new_notification = NotificationService.create_notification(data, user_id)
        return jsonify(new_notification), 201


@app_route.route('/notifications/<notification_id>', methods=['GET', 'DELETE', 'PUT'])
def notification_id(notification_id):
    """
    Route to handle geting, updating and deleting
    a notification by its id
    """
    if request.method == 'GET':
        notification = NotificationService.get_notification_by_id(notification_id)
        return jsonify(notification), 200

    if request.method == 'DELETE':
        no_notification = NotificationService.delete_notification(notification_id)
        return jsonify(no_notification), 200

    if request.method == 'PUT':
        data = request.get_json()
        notification = NotificationService.update_notification(data, notification_id)
        if notification is None:
            abort(404, 'Not found')
        return jsonify(notification), 200


@app_route.route('/notifications', methods=['GET'])
def notifications_all():
    """
    Route to handle geting all notifications
    """
    notifications = NotificationService.all_notifications()
    return jsonify(notifications), 200
