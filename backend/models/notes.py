from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class NoteBase(BaseModel):
    client_id: str
    client_name: str
    client_age: int
    session_date: str
    start_time: str
    duration: int
    session_type: str
    location: str
    parent_present: bool
    therapist_name: str
    supervisor_name: Optional[str] = None
    raw_observations: str

class NoteCreate(NoteBase):
    professional_note: Optional[str] = None 


class NoteResponse(NoteBase):
    id: str
    professional_note: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class NoteUpdate(BaseModel):
    professional_note: str