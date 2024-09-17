#!/usr/bin/python3
from backend.app.models.engine.storage import Storage

storage = Storage()

#TODO
# Verify the database connection
if storage.verify_connection():
    print("Database connection successful.")
else:
    print("Database connection failed.")

storage.reload()

#TODO remove
if storage.tables_exist():
    print("Tables exist")
else:
    print("Some tables Missing.")
