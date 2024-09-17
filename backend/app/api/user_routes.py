#!/usr/bin/python3

from backend.app.api import app_route
from flask import abort, jsonify, request
from backend.app.services.user_service import UserServices


# Get all users
@app_route.route('/users', methods=['GET'])
def get_all_users():
    users = UserServices.all_users()
    return jsonify(users)


# Register a new User
@app_route.route('/users/register', methods=['POST'])
def register_user():
    """
        Route to handle the registration of a new
        user
    """
    data = request.get_json()
    new_user = UserServices.register_user(data)
    if new_user is None:
        abort(400, 'Error Creating user')
    return jsonify(new_user), 201


# User login
@app_route.route('/users/login', methods=['POST'])
def login_user():
    """
    Route to handle login of a user
    """
    data = request.get_json()
    tkn = UserServices.verify_login(data)
    if tkn is None:
        abort(404, 'Token Generation Error')
    return tkn, 201


@app_route.route('/users/<user_id>', methods=['GET', 'DELETE', 'PUT'])
def users_with_id(user_id):
    """
        Route to handle requests with user id
    """
    if request.method == 'GET':
        user = UserServices.get_user_by_id(user_id)
        if user is None:
            abort(404, 'Not found')
        return jsonify(user), 200

    if request.method == 'DELETE':
        no_user = UserServices.delete_user(user_id)
        return jsonify(no_user), 200

    if request.method == 'PUT':
        data = request.get_json()
        user = UserServices.update_user(data, user_id)
        if user is None:
            abort(404, 'Not found')
        return jsonify(user), 200


@app_route.route('/users/email/<email>', methods=['GET'])
def get_user_by_email(email):
    """
    Route to handle getting a user by email
    """
    user = UserServices.get_user_by_email(email)
    if user is None:
        abort(404, 'User not found')
    return jsonify(user), 200
