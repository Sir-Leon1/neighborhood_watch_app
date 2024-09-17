#!/usr/bin/python3

from backend.app.api import app_route
from flask import abort, jsonify, request


@app_route.route('/', methods=['GET'])
def status():
    return jsonify({"status": "ok"})
