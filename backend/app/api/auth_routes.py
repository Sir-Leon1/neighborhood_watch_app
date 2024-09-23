import os

from backend.app.api import auth_routes
from supertokens_python.recipe.session.framework.flask import verify_session
from supertokens_python.recipe.multitenancy.syncio import list_all_tenants
from flask import Flask, abort, g, jsonify


@auth_routes.route("/sessioninfo", methods=["GET"])  # type: ignore
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

@auth_routes.route("/tenants", methods=["GET"])  # type: ignore
def get_tenants():
    tenantReponse = list_all_tenants()

    tenantsList = []

    for tenant in tenantReponse.tenants:
        tenantsList.append(tenant.to_json())

    return jsonify({
        "status": "OK",
        "tenants": tenantsList,
    })

@auth_routes.route("/", defaults={"u_path": ""})  # type: ignore
@auth_routes.route("/<path:u_path>")
def catch_all(u_path: str):
    abort(404)



