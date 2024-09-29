#!/usr/bin/python3
"""
Starting point of the flask app
"""
import os

from flask import Flask
from flask_cors import CORS
from backend.app.api import app_route
from backend.app.models import storage
import os
from dotenv import load_dotenv
import logging

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/": {"origins": "https://fortressapi.vilet.tech"}})
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Avoid overriding Flask's internal logger property
for handler in logger.handlers:
    app.logger.addHandler(handler)
app.logger.setLevel(logger.level)

app.register_blueprint(app_route)

if __name__ == "__main__":
    app.run(host=os.getenv('SS_API_HOST'),
            port=int(os.getenv('SS_API_PORT')),
            threaded=True, debug=True)
