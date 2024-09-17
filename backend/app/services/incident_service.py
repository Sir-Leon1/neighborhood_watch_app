#!/usr/bin/python3
from flask import abort
from backend.app.schemas.incident_schema import incident_schema, incidents_schema
from backend.app.models import storage
from backend.app.models.engine.storage import CNC
from backend.app.models.notification import Notification
from backend.app.models.incident import Incident

"""
Handles incident management,
Such as reporting , retrieving, updating and deleting 
incidents 
"""


class IncidentServices:

    @staticmethod
    def report_incident(data, user_id):
        """
            Report an incident
        """
        if data is None:
            abort(400, 'Not valid data')

        errors = incident_schema.validate(data)
        if errors:
            abort(400, str(errors))

        for i in ['title', 'description', 'location', 'user_id']:
            if i not in data:
                abort(400, f'{i} is required')

        incident = CNC.get('Incident')
        if incident is None:
            abort(400, 'An error occurred while creating the incident')
        new_incident = incident(
            title=data['title'],
            description=data['description'],
            location=data['location'],
        )
        new_incident.reported_by = user_id
        try:
            new_incident.save()
        except Exception as e:
            abort(400, 'An error occurred while creating the incident')
        return new_incident.to_dict()

    @staticmethod
    def get_incident_by_id(incident_id):
        """
        Get an incident by its id
        """
        incident = storage.get('Incident', incident_id)
        if incident is None:
            abort(404, 'Incident not found')
        return incident_schema.dump(incident)

    @staticmethod
    def get_all_incidents():
        """
        Get all incidents
        """
        incidents = storage.all('Incident')
        return [incident.to_dict() for incident in incidents.values()]

    @staticmethod
    def get_all_incidents_by_user(user_id):
        """
            Get all incidents by a user
        """
        user = storage.get('User', user_id)
        if user is None:
            abort(404, 'User not found')
        incidents = storage.all('Incident')
        user_incidents = []
        for incident in incidents.values():
            if incident.reported_by == user_id:
                user_incidents.append(incident)
        return incidents_schema.dump(user_incidents)

    @staticmethod
    def update_incident(data, incident_id):
        """
            Update an incident
        """
        if data is None:
            abort(400, 'Not valid data')

        errors = incident_schema.validate(data)
        if errors:
            abort(400, str(errors))

        incident = storage.get('Incident', incident_id)
        if incident is None:
            abort(404, 'Incident not found')

        for key, value in data.items():
            if key not in ['id', 'created_at', 'updated_at', 'reported_by']:
                setattr(incident, key, value)

        try:
            incident.save()
        except Exception as e:
            abort(400, 'An error occurred while updating the incident')
        return incident_schema.dump(incident)

    @staticmethod
    def delete_incident(incident_id):
        """
        Delete an incident
        """
        incident = storage.get('Incident', incident_id)
        if incident is None:
            abort(404, 'Incident not found')
        storage.delete(incident)
        storage.save()
        return {"message": "Incident deleted successfully"}

    @staticmethod
    def notifications_incidents():
        """
        Join notifications and incidents
        :return: The joined data.
        """
        session = storage.get_session()
        results = session.query(
            Notification.message,
            Incident.title,
            Incident.description,
            Incident.status,
            Incident.created_at,
            Incident.location
        ).join(Incident, Notification.incident_id == Incident.id).all()

        # Format the results as a list of dictionaries
        notifications = []
        for result in results:
            notifications.append({
                'message': result.message,
                'title': result.title,
                'description': result.description,
                'status': result.status,
                'incident_created_at': result.created_at,
                'location': result.location
            })
        return notifications
