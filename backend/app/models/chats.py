from pydantic import BaseModel
from uuid import UUID

class Chat(BaseModel):
    id: UUID
    user_id: UUID
    document_id: UUID
