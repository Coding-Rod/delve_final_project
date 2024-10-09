from decouple import config

MONGO_URI = config("MONGO_URI")
DATABASE_NAME = config("DATABASE_NAME")
JWT_SECRET = config("JWT_SECRET")
