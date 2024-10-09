from fastapi import APIRouter
from app.services.ask_service import AskService

router = APIRouter()

@router.patch("/ask/{chat_id}")
async def ask_question(chat_id: str):
    return await AskService.ask_question(chat_id)

@router.get("/ask/markdown/{document_id}")
async def get_markdown(document_id: str):
    return await AskService.get_markdown(document_id)
