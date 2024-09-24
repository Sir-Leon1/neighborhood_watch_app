import os
from dotenv import load_dotenv
from supertokens_python.recipe import emailpassword, session, dashboard, userroles
from supertokens_python import (
    InputAppInfo,
    SupertokensConfig,
)
from supertokens_python.recipe.emailpassword.interfaces import RecipeInterface, SignUpOkResult
from supertokens_python.recipe.userroles.syncio import add_role_to_user
from supertokens_python.recipe.userroles.interfaces import UnknownRoleError
from typing import Dict, Any

load_dotenv()

# this is the location of the SuperTokens core.
supertokens_config = SupertokensConfig(
    connection_uri=os.getenv("SUPERTOKENS_CONNECTION_URI"),
    api_key=os.getenv("SUPERTOKENS_API_KEY")
)

app_info = InputAppInfo(
    app_name="fortress",
    api_domain="http://localhost:3001",
    website_domain="http://localhost:3000",
)

framework = "flask"


def override_emailpassword_functions(original_implementation: RecipeInterface) -> RecipeInterface:
    original_sign_up = original_implementation.sign_up

    async def sign_up(
            email: str,
            password: str,
            tenant_id: str,
            user_context: Dict[str, Any]
    ):
        result = await original_sign_up(email, password, tenant_id, user_context)

        if isinstance(result, SignUpOkResult):
            id = result.user.user_id
            email = result.user.email
            print(id)
            print(email)

            # Add role to the new user
            add_role_to_user_func(id, "user")

        return result

    original_implementation.sign_up = sign_up

    return original_implementation


def add_role_to_user_func(user_id: str, role: str):
    role = "user"
    try:
        res = add_role_to_user("public", user_id, role)
        if res.did_user_already_have_role:
            # User already had this role
            pass
    except UnknownRoleError:
        # No such role exists
        return


# recipeList contains all the modules that you want to
# use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
recipe_list = [
    session.init(),
    emailpassword.init(
        override=emailpassword.InputOverrideConfig(
            functions=override_emailpassword_functions
        ),
    ),
    dashboard.init(),
    userroles.init()
]
