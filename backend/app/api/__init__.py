#!/usr/bin/python3
"""Initialize the views package"""

from flask import Blueprint


app_route = Blueprint('blueprint', __name__, url_prefix='/api')
auth_routes = Blueprint('auth_routes', __name__, url_prefix='/auth')


from backend.app.api.index import *
from backend.app.api.user_routes import *
from backend.app.api.auth_routes import *
from backend.app.api.user_routes import *
from backend.app.api.help_routes import *
from backend.app.api.incident_routes import *
from backend.app.api.notification_routes import *
from backend.app.api.settings_routes import *

