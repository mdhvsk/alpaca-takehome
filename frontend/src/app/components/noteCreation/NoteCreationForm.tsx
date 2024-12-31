"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { ClientInfoSection } from './ClientInfoSection';
import { SessionDetailsSection } from './SessionDetailsSection';
import { StaffInfoSection } from './StaffInfoSection';
import { ObservationsSection } from './ObservationsSection';
import { useRouter } from 'next/navigation';




const NoteCreationForm = () => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    client_name: '',
    client_age: '', // Changed to match Python model (will convert to int)
    session_date: '',
    start_time: '',
    duration: 60,
    session_type: 'individual',
    location: 'clinic',
    parent_present: false,
    therapist_name: '',
    supervisor_name: '', // Optional in Python model
    raw_observations: '',

  });
  const [generatedNote, setGeneratedNote] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("FOrm data")
    console.log(formData)
    console.log("In handle submit")
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/notes/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data)
      setGeneratedNote(data.professional_note);
    } catch (error) {
      console.error('Error generating note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefine = async () => {
    setIsLoading(true);

    const refinementData = {
      ...formData,
      professional_note: generatedNote, 
    };
    try {
      const response = await fetch('http://localhost:8000/api/notes/refine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refinementData),
      });
      const data = await response.json();
      setGeneratedNote(data.professional_note);
    } catch (error) {
      console.error('Error refining note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {

    const refinementData = {
      ...formData,
      professional_note: generatedNote, 
    };
    try {
      const response = await fetch('http://localhost:8000/api/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(refinementData),
      });
      const data = await response.json();
      setGeneratedNote(data.professional_note);
    } catch (error) {
      console.error('Error refining note:', error);
    } finally {
      setIsLoading(false);
      router.push('/')


    }

    console.log('Saving note:', {
      ...formData,
      professional_note: generatedNote
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Session Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ClientInfoSection 
              formData={formData} 
              onChange={handleInputChange} 
            />
            
            <SessionDetailsSection 
              formData={formData}
              onChange={handleInputChange}
              onCheckboxChange={handleCheckboxChange}
            />

            <StaffInfoSection 
              formData={formData}
              onChange={handleInputChange}
            />

            <ObservationsSection 
              formData={formData}
              generatedNote={generatedNote}
              isLoading={isLoading}
              onChange={handleInputChange}
              onGeneratedNoteChange={(e) => setGeneratedNote(e.target.value)}
              onRefine={handleRefine}
              onSave={handleSave}
            />

            {!generatedNote && (
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Professional Note...
                  </>
                ) : (
                  'Generate Professional Note'
                )}
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteCreationForm;