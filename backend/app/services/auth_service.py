import bcrypt
from app.utils.jwt_handler import create_jwt
from app.db.config import db

class AuthService:
    @staticmethod
    async def signup(user):
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
        user_data = user.dict()
        user_data["password"] = hashed_password
        await db.users.insert_one(user_data)
        return {"msg": "User created successfully"}

    @staticmethod
    async def login(user):
        db_user = await db.users.find_one({"username": user.username})
        if not db_user or not bcrypt.checkpw(user.password.encode('utf-8'), db_user['password']):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = create_jwt(db_user["id"])
        return {"token": token}

