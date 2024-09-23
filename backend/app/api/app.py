#!/usr/bin/python3
"""
Starting point of the flask app
"""
import os

from flask import Flask
from flask_cors import CORS
from supertokens_python import (
get_all_cors_headers,
init,
)
from supertokens_python.framework.flask import Middleware
from supertokens_python.recipe.session.framework.flask import verify_session
from supertokens_python.recipe.multitenancy.syncio import list_all_tenants
from backend.app import config
from backend.app.api import app_route
from backend.app.models import storage
import os
from dotenv import load_dotenv
import logging

init(
    supertokens_config=config.supertokens_config,
    app_info=config.app_info,
    framework=config.framework,
    recipe_list=config.recipe_list,
)

load_dotenv()

app = Flask(__name__)
Middleware(app)
CORS(
    app=app,
    supports_credentials=True,
    origins="http://localhost:3000",
    allow_headers=["Content-Type"] + get_all_cors_headers(),
)
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
