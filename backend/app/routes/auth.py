from fastapi import APIRouter, HTTPException, Depends
from app.models.users import UserSignup, UserLogin
from app.services.auth_service import AuthService

router = APIRouter()

@router.post("/auth/signup")
async def signup(user: UserSignup):
    return await AuthService.signup(user)

@router.post("/auth/login")
async def login(user: UserLogin):
    return await AuthService.login(user)
