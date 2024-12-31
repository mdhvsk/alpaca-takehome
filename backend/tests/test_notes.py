import pytest
from fastapi.testclient import TestClient
from main import app
from ..services.notes_service import NotesService
from ..services.ai_service import AIService
from ..models.notes import NoteCreate

@pytest.fixture
def notes_service_mock():
    return NotesService()

@pytest.fixture
def ai_service_mock():
    return AIService()

def test_get_notes(notes_service_mock, mocker):
    mocker.patch.object(notes_service_mock, 'get_notes', return_value=[])
    client = TestClient(app)
    response = client.get('/api/notes')
    assert response.status_code == 200
    assert response.json() == []

def test_generate_note(ai_service_mock, mocker):
    mocker.patch.object(ai_service_mock, 'generate_note', return_value='Generated Note')
    client = TestClient(app)
    note_data = NoteCreate(
        client_name='John Doe',
        client_age=35,
        session_date='2023-05-01',
        start_time='10:00',
        duration=60,
        session_type='individual',
        location='clinic',
        parent_present=True,
        therapist_name='Jane Smith',
        supervisor_name='Dr. Johnson',
        raw_observations='Client was engaged and responsive.'
    )
    response = client.post('/api/notes/generate', json=note_data.dict())
    assert response.status_code == 200
    assert response.json() == {'professional_note': 'Generated Note'}

def test_refine_note(ai_service_mock, mocker):
    mocker.patch.object(ai_service_mock, 'refine_note', return_value='Refined Note')
    client = TestClient(app)
    note_data = NoteCreate(
        client_name='John Doe',
        client_age=35,
        session_date='2023-05-01',
        start_time='10:00',
        duration=60,
        session_type='individual',
        location='clinic',
        parent_present=True,
        therapist_name='Jane Smith',
        supervisor_name='Dr. Johnson',
        raw_observations='Client was engaged and responsive.',
        professional_note='Generated Note'
    )
    response = client.post('/api/notes/refine', json=note_data.dict())
    assert response.status_code == 200
    assert response.json() == {'professional_note': 'Refined Note'}