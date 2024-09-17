import logging
from flask import Flask
from backend.app.services.auth_service import AuthService
import os

# Configure logging for the test
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def test_generate_token():
    app = Flask(__name__)

    with app.app_context():
        user_id = 1  # Sample user ID
        token = AuthService.generate_tokens(user_id)
        if token:
            logger.info(f"Generated token: {token}")
        else:
            logger.error("Failed to generate token")


if __name__ == "__main__":
    test_generate_token()