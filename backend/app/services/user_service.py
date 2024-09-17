#!/usr/bin/python3
from sqlalchemy.exc import IntegrityError, PendingRollbackError
from backend.app.models import user, dbase
from werkzeug.security import generate_password_hash, check_password_hash
from flask import abort, jsonify
from backend.app.schemas.user_schema import user_schema, users_schema
from backend.app.models import storage
from backend.app.models.engine.storage import CNC
from backend.app.services.auth_service import AuthService


"""
    Handles operations related to user management, 
    registration, login and profile management
"""


class UserServices:

    @staticmethod
    def register_user(data):

        """
        Register a new user
        """
        if data is None:
            abort(400, 'Not valid data')

        errors = user_schema.validate(data)
        if errors:
            abort(400, str(errors))

        for i in ['username', 'email', 'password', 'user_type', 'phone_no']:
            if i not in data:
                abort(400, f'{i} is required')

        password_hash = generate_password_hash(data['password'])

        user = CNC.get('User')
        if user is None:
            return None
        new_user = user(
            username=data['username'],
            email=data['email'],
            password_hash=password_hash,
            user_type=data['user_type'],
            phone_no=data['phone_no']
        )
        try:
            new_user.save()
        except IntegrityError as e:
            if 'username' in str(e.args):
                abort(400, 'Username is already taken')
            elif 'email' in str(e.args):
                abort(400, 'Email is already taken')
            elif 'phone_no' in str(e.args):
                abort(400, 'Phone number is already taken')
            else:
                abort(400, 'An error occurred while creating the user')
        except PendingRollbackError:
            storage.rollback()
            return UserServices.register_user(data)
        return new_user.to_dict()

    @staticmethod
    def verify_login(data):
        """
        Verify login info of a user
        """
        if data is None:
            abort(400, 'Not valid data')
        if 'email' not in data or 'password' not in data:
            abort(400, 'Email and password are required')
        email = data['email']
        use = storage.get('User', None, email)
        if use is None:
            abort(404, 'User not found')
        if use and check_password_hash(use.password_hash, data['password']):
            tkn = AuthService.generate_tokens(use.id)
            return tkn
        return ({})

    @staticmethod
    def get_user_by_id(user_id):
        user = storage.get('User', user_id, None)
        if user is None:
            abort(404, 'User not found')
        return user.to_dict()

    @staticmethod
    def update_user(data, user_id):
        if data is None:
            abort(400, 'Not valid data')
        user = storage.get('User', user_id, None)
        if user is None:
            abort(404, 'Not Found')
        for k, v in data.items():
            if k not in ['id', 'created_at', 'updated_at']:
                setattr(user, k, v)
        storage.save()
        return user.to_dict()

    @staticmethod
    def delete_user(user_id):
        user = storage.get('User', user_id, None)
        if user is None:
            abort(404, 'User not found')
        storage.delete(user)
        storage.save()
        return {}

    @staticmethod
    def all_users():
        users = storage.all('User')
        if users is None:
            abort(404, 'Users not found')
        return [user.to_dict() for user in users.values()]

    @staticmethod
    def get_user_by_email(email):
        user = storage.get('User', None, email)
        if user is None:
            return None
        return user.to_dict()
