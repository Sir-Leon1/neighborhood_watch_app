import os
from dotenv import load_dotenv

from supertokens_python.recipe import emailpassword, session, dashboard
from supertokens_python import (
    InputAppInfo,
    SupertokensConfig,
)

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

# recipeList contains all the modules that you want to
# use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
recipe_list = [
    session.init(),
    emailpassword.init(),
    dashboard.init(),
]
