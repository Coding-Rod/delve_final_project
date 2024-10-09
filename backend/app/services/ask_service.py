""" Ask Pipeline
2. For /ask/<chat_id>
  - Get the markdown from the database
  - Pass the markdown to the llama model
  - Return the response
"""

from app.config import MONGO_URI
from app.db.config import db

class AskService:
    @staticmethod
    async def ask_question(chat_id):
        chat = await db.chats.find_one({"id": chat_id})
        document = await db.documents.find_one({"id": chat["document_id"]})
        filename = document["filename"]
        markdown_content = document["content"]
        
        # TODO: Pass the markdown to the llama model
        # return {"response": response}

    @staticmethod
    async def get_markdown(document_id):
        document = await db.documents.find_one({"id": document_id})
        return {"markdown": document["content"]}
