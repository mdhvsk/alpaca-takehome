"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';


interface Note {
    id: string;
    client_id: string;
    client_name: string;
    client_age: number;
    session_date: string;
    start_time: string;
    duration: number;
    session_type: string;
    location: string;
    parent_present: boolean;
    therapist_name: string;
    supervisor_name: string;
    raw_observations: string;
    professional_note: string;
    created_at: string;
    updated_at: string;
  };
  
const HomePage = () => {
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/notes');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleCreateNewPatient = () => {
    router.push('/notes');
  };

  return (
    <div className="container mx-auto p-4">
  <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Alpaca Health Portal</h1>
        <Button onClick={handleCreateNewPatient}>Create New Patient Record</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <CardTitle>{note.client_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">ID: {note.client_id}</p>
              <p className="text-gray-600 mb-2">Start Time: {note.start_time}</p>
              <p className="text-gray-600 mb-2">Therapist: {note.therapist_name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;