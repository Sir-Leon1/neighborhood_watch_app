#!/usr/bin/python3

""" Contains the class DBStorage"""
import logging
from os import getenv
from backend.app.models.dbase import Base
from backend.app.models.user import User
from backend.app.models.incident import Incident
from backend.app.models.notification import Notification
from backend.app.models.adminLog import AdminLog
from backend.app.models.settings import Settings
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker, scoped_session
from dotenv import load_dotenv

load_dotenv(dotenv_path='/home/sir-leon1/Projects/Learning/Web-Dev/neighborhood_watch_app/backend/app/api/.env')

CNC = {"Incident": Incident,
       "User": User,
       "Settings": Settings,
       "AdminLog": AdminLog,
       "Notification": Notification
       }
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Storage():
    """Handles long term storage of class instances"""
    CNC = {"Incident": Incident,
           "User": User,
           "Settings": Settings,
           "AdminLog": AdminLog,
           "Notification": Notification
           }

    """Interacting with the MySQL DB"""
    __engine = None
    __session = None

    def __init__(self):
        """Instatiate a DB object"""
        SSMYSQL_USER = getenv('SSMYSQL_USER')
        SSMYSQL_PWD = getenv('SSMYSQL_PWD')
        SSMYSQL_HOST = getenv('SSMYSQL_HOST')
        SSMYSQL_DB = getenv('SSMYSQL_DB')
        self.__engine = create_engine('mysql+mysqldb://{}:{}@{}/{}'.
                                      format(SSMYSQL_USER,
                                             SSMYSQL_PWD,
                                             SSMYSQL_HOST,
                                             SSMYSQL_DB))

    def all(self, cls=None):
        """Query current DB session"""
        new_dict = {}
        for clss in CNC:
            if cls is None or cls is CNC[clss] or cls is clss:
                objs = self.__session.query(CNC[clss]).all()
                for obj in objs:
                    key = obj.__class__.__name__ + '.' + obj.id
                    new_dict[key] = obj
        return new_dict

    def new(self, obj):
        """Add new obj to the DB session"""
        self.__session.add(obj)

    def save(self):
        """Commit all changes of current DB session"""
        self.__session.commit()

    def delete(self, obj=None):
        """Delete the obj from the current DB session"""
        self.__session.delete(obj)

    def reload(self):
        """Reload data from the DB"""
        try:
            Base.metadata.create_all(self.__engine)
            Session = scoped_session(sessionmaker(bind=self.__engine, expire_on_commit=False))
            self.__session = Session()
            #TODO REMOVE
            print("Session initialized:", self.__session)
            if self.__session is None:
                raise Exception("Session is not initialized.")
        except Exception as e:
            logger.error(f"Error creating tables: {e}")

    def get_session(self):
        return self.__session

    def close(self):
        """Close the session"""
        self.__session.remove()

    def get(self, cls, id=None, email=None):
        """Retrieve one obj"""
        if cls and id is not None:
            fetch = "{}.{}".format(cls, id)
            all_obj = self.all(cls)
            return all_obj.get(fetch)
        if cls and email:
            all_obj = self.all(cls)
            for obj in all_obj.values():
                if obj.email == email:
                    return obj
        return None

    def count(self, cls=None):
        """Method to count the num of objs in storage"""
        if cls is not None:
            if cls not in CNC.values():
                return None
            return self.__session.query(cls).count()
        total_count = 0
        for clss in CNC.values():
            total_count += self.__session.query(clss).count()
        return total_count

    def rollback(self):
        """Rollback the session"""
        self.__session.rollback()

    #TODO remove
    def tables_exist(self):
        """Check if tables exist"""
        inspector = inspect(self.__engine)
        tables = inspector.get_table_names()
        if not tables:
            return False
        return True

    def verify_connection(self):
        """Verify the database connection"""
        try:
            self.__engine.connect()
            return True
        except Exception as e:
            logger.error(f"Database connection failed: {e}")
            return False
