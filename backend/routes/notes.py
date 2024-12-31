# app/api/routes/notes.py
from fastapi import APIRouter, HTTPException, Depends
from typing import List
from ..models.notes import NoteCreate, NoteResponse, NoteUpdate, NoteBase
from pydantic import BaseModel
from ..services.notes_service import NotesService
from ..services.ai_service import AIService

class NoteRequest(BaseModel):
    note: str


router = APIRouter(prefix="/api/notes", tags=["notes"])

@router.get("/", response_model=List[NoteResponse])
async def get_notes(
    notes_service: NotesService = Depends()
):
    try:
        notes = await notes_service.get_notes()
        return notes
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate", response_model=dict)
async def generate_note(
    request: NoteCreate, 
    ai_service: AIService = Depends()
):
    try:
        professional_note = await ai_service.generate_note(request)
        return {"professional_note": professional_note}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.post("/refine", response_model=dict)
async def refine_note(
    request: NoteCreate,  
    ai_service: AIService = Depends()
):
    try:
        current_note = request.professional_note  
        
        refined_note = await ai_service.refine_note(current_note, request)
        return {"professional_note": refined_note}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=NoteResponse)
async def create_note(
    note: NoteCreate,
    notes_service: NotesService = Depends()
):
    try:
        created_note = await notes_service.create_note(note)
        return created_note
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))