from openai import AsyncOpenAI
import os
from dotenv import load_dotenv
from ..config import settings
from ..models.notes import NoteCreate

class AIService:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=os.getenv('OPENAI_API_KEY'))

    async def generate_note(self, note_data: NoteCreate) -> str:
        prompt = self._create_prompt(note_data)
        print(prompt)
        
        response = await self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {"role": "system", "content": "You are an experienced ABA therapist who writes professional and detailed session notes. You focus on objective observations, measurable behaviors, and follow SOAP note format where appropriate."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        
        return response.choices[0].message.content
    

    async def generate_individual_note(self, raw_note: str) -> str:
        prompt = self._create_prompt(raw_note)
        print(prompt)
        response = await self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {"role": "system", "content": "You are an experienced ABA therapist who writes professional and detailed session notes. You focus on objective observations, measurable behaviors, and follow SOAP note format where appropriate."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        
        return response.choices[0].message.content
        

    def _create_prompt(self, note_data: NoteCreate) -> str:
        return f"""
        You are an experienced ABA therapist writing a professional session note. 
        Please convert the following session information and observations into a well-structured,
        professional therapy note following ABA best practices.

        Session Details:
        Client: {note_data.client_name} (Age: {note_data.client_age})
        Date: {note_data.session_date}
        Time: {note_data.start_time}
        Duration: {note_data.duration} minutes
        Session Type: {note_data.session_type}
        Location: {note_data.location}
        Parent Present: {"Yes" if note_data.parent_present else "No"}
        Therapist: {note_data.therapist_name}
        Supervisor: {note_data.supervisor_name or "N/A"}

        Raw Observations:
        {note_data.raw_observations}

        Please structure the note with the following sections:
        1. Session Overview
        2. Behavioral Observations
        3. Interventions Used
        4. Progress Notes
        5. Recommendations

        Use professional clinical language and maintain SOAP note format where appropriate.
        Focus on objective observations and measurable behaviors.
        """
        
    async def refine_note(self, current_note: str, note_data: NoteCreate) -> str:
        prompt = self._create_refinement_prompt(current_note, note_data)
        print(prompt)
        
        response = await self.client.chat.completions.create(
            model="gpt-4-0125-preview",
            messages=[
                {"role": "system", "content": "You are an experienced ABA therapist who reviews and refines professional session notes. Focus on enhancing clarity, precision, and clinical relevance while maintaining the original note's core observations and insights."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.6  
        )
        
        return response.choices[0].message.content

    def _create_refinement_prompt(self, current_note: str, note_data: NoteCreate) -> str:
        return f"""
        You are an experienced ABA therapist refining a previously written session note. 
        Review the current note and consider the original session context to improve its quality.

        Original Session Details:
        Client: {note_data.client_name} (Age: {note_data.client_age})
        Date: {note_data.session_date}
        Time: {note_data.start_time}
        Duration: {note_data.duration} minutes
        Session Type: {note_data.session_type}
        Location: {note_data.location}
        Parent Present: {"Yes" if note_data.parent_present else "No"}
        Therapist: {note_data.therapist_name}
        Supervisor: {note_data.supervisor_name or "N/A"}

        Original Raw Observations:
        {note_data.raw_observations}

        Current Note to Refine:
        {current_note}

        Refinement Instructions:
        1. Review the note for clinical accuracy and comprehensiveness
        2. Enhance clarity and precision of language
        3. Ensure all key observations are captured
        4. Maintain the original structure and tone
        5. Add any missing critical details from the original session information
        6. Improve professional clinical language
        7. Ensure the note follows best practices for ABA therapy documentation

        Provide a refined version of the note that maintains the original insights while improving overall quality and clarity.
        """