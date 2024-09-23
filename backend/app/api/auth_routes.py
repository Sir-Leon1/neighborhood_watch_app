import os

from backend.app.api import app_route
from supertokens_python.recipe.session.framework.flask import verify_session
from flask import Flask, abort, g, jsonify


@app_route.route("/sessioninfo", methods=["GET"])  # type: ignore
@verify_session()
def get_session_info():
    session_ = g.supertokens
    return jsonify(
        {
            "sessionHandle": session_.get_handle(),
            "userId": session_.get_user_id(),
            "accessTokenPayload": session_.get_access_token_payload(),
        }
   )

@app_route.route("/tenants", methods=["GET"])  # type: ignore
def get_tenants():
    tenantReponse = list_all_tenants()

    tenantsList = []

    for tenant in tenantReponse.tenants:
        tenantsList.append(tenant.to_json())

    return jsonify({
        "status": "OK",
        "tenants": tenantsList,
    })

@app_route.route("/", defaults={"u_path": ""})  # type: ignore
@app_route.route("/<path:u_path>")
def catch_all(u_path: str):
    abort(404)



