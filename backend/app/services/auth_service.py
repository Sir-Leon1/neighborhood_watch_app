#!/usr/bin/python3
import os
import jwt
import logging
from datetime import datetime, timedelta
from backend.app.models import user
from flask import current_app

logger = logging.getLogger(__name__)

# Todo: Implement the AuthService class
class AuthService:

    @staticmethod
    def generate_token(user_id, expires_in=1):
        payload = {
            'exp': datetime.utcnow() + timedelta(days=expires_in),
            'iat': datetime.utcnow(),
            'sub': user_id
        }
        try:
            tkn = jwt.encode(payload, os.getenv('SECRET_KEY'), algorithm='HS256')
        except Exception as e:
            logger.error(f"Error generating token: {e}")
            return None
        if tkn is None:
            return {"message": "Error in token generation"}
        return tkn

    @staticmethod
    def verify_token(token):
        try:
            jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            return
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    @staticmethod
    def generate_tokens(user_id):
        access_token = AuthService.generate_token(user_id, expires_in=1)
        refresh_token = AuthService.generate_token(user_id, expires_in=30)
        return {
            'access_token': access_token,
            'refresh_token': refresh_token
        }
