#!/usr/bin/python3

from backend.app.api import app_route
from flask import abort, jsonify, request
from backend.app.models import storage
from backend.app.models.engine.storage import CNC
from backend.app.schemas.user_schema import user_schema, users_schema
from backend.app.services.incident_service import IncidentServices


# Report a new incident
@app_route.route('/users/<user_id>/incidents', methods=['GET', 'POST'])
def incidents_no_id(user_id):
    """
    Route to handle geting and creating
    new incidents
    """
    if request.method == 'GET':
        incidents = IncidentServices.get_all_incidents_by_user(user_id)
        return jsonify(incidents), 200

    if request.method == 'POST':
        data = request.get_json()
        new_incident = IncidentServices.report_incident(data, user_id)
        return jsonify(new_incident), 201


# Get an incident by its id
@app_route.route('/incidents/<incident_id>', methods=['GET', 'DELETE', 'PUT'])
def incident_id(incident_id):
    """
    Route to handle geting, updating and deleting
    an incident by its id
    """
    if request.method == 'GET':
        incident = IncidentServices.get_incident_by_id(incident_id)
        return jsonify(incident), 200

    if request.method == 'DELETE':
        no_incident = IncidentServices.delete_incident(incident_id)
        return jsonify(no_incident), 200

    if request.method == 'PUT':
        data = request.get_json()
        incident = IncidentServices.update_incident(data, incident_id)
        if incident is None:
            abort(404, 'Not found')
        return jsonify(incident), 200


# Get all incidents
@app_route.route('/incidents', methods=['GET'])
def incidents_all():
    """
    Route to handle geting all incidents
    """
    incidents = IncidentServices.get_all_incidents()
    return jsonify(incidents), 200


@app_route.route('/incidents/notifications', methods=['GET'])
def get_notifications_incidents():
    notifications = IncidentServices.notifications_incidents()
    return jsonify(notifications), 200
