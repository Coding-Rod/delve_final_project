from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from enum import Enum

class Sender(str, Enum):
    bot = "bot"
    user = "user"

class Message(BaseModel):
    id: UUID
    document_id: UUID
    text: str
    timestamp: datetime
    sender: Sender
