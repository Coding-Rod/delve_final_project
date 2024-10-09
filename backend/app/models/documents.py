from pydantic import BaseModel
from uuid import UUID

class Document(BaseModel):
    id: UUID
    filename: str
    content: str  # Markdown content
