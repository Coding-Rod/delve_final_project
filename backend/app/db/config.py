from pymongo import MongoClient
from app.config import MONGO_URI

def get_database():
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = MONGO_URI

    # Create a connection using MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial)
    return client['your_database_name']

# Get the database
db = get_database()