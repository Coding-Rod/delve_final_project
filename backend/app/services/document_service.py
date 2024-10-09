""" Document pipeline

1. For /upload/document
  - Convert pdf file to images
  - Separate images in blocks of text
  - Separate: text, images and tables
  - Convert everything to markdown and save it in the database
  - Pass the markdown to the llama model
"""

import pdf2image
from app.config import MONGO_URI

class DocumentService:
    @staticmethod
    async def upload_document(file):
        # Step 1 Convert PDF to images
        images = pdf2image.convert_from_bytes(await file.read())
        
        # TODO: Step 2 Separate images in blocks of text
        # TODO: Step 3 Separate: text, images and tables
        # TODO: Step 4 Convert everything to markdown and save it in the database
        # TODO: Step 5 Pass the markdown to the llama model

        # Return the number of images
        return {"message": f"Successfully uploaded {len(images)} pages"}