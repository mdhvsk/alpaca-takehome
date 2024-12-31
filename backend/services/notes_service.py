# app/services/notes_service.py
from supabase import create_client

from ..config import settings
from ..models.notes import NoteCreate, NoteUpdate
from datetime import datetime

class NotesService:
    def __init__(self):
        self.supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

    async def get_notes(self):
        response = self.supabase.table('notes')\
            .select('*')\
            .execute()
        return response.data

    async def get_note(self, note_id: str):
        response = self.supabase.table('notes')\
            .select('*')\
            .eq('id', note_id)\
            .single()\
            .execute()
        return response.data

    async def create_note(self, note: NoteCreate):
        # note_data = note.model_dump()
        response = await self.supabase.table("notes").insert(note.dict()).execute()

        return response.data[0]

    async def update_note(self, note_id: str, note: NoteUpdate):
        note_data = note.model_dump()
        note_data['updated_at'] = datetime.utcnow().isoformat()
        
        response = self.supabase.table('notes')\
            .update(note_data)\
            .eq('id', note_id)\
            .execute()
        return response.data[0]

