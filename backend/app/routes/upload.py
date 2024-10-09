from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from app.services.document_service import DocumentService

router = APIRouter()

@router.post("/upload/document")
async def upload_document(file: UploadFile = File(...)):
    result = await DocumentService.upload_document(file)
    return JSONResponse(content=result, status_code=201)