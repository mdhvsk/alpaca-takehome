// components/notes/ObservationsSection.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface ObservationsSectionProps {
  formData: {
    raw_observations: string;
  };
  generatedNote: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGeneratedNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onRefine: () => void;
  onSave: () => void;
}

export const ObservationsSection = ({ 
  formData, 
  generatedNote,
  isLoading,
  onChange,
  onGeneratedNoteChange,
  onRefine,
  onSave
}: ObservationsSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Session Notes</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Quick Observations</label>
        <textarea
          className="w-full p-2 border rounded min-h-32"
          name="raw_observations"
          value={formData.raw_observations}
          onChange={onChange}
          placeholder="Enter your observations in any format (bullet points, quick notes, etc.)"
          required
        />
      </div>

      {generatedNote && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Professional Note</h3>
          <div className="space-y-4">
            <textarea
              className="w-full p-2 border rounded min-h-48"
              value={generatedNote}
              onChange={onGeneratedNoteChange}
            />
            <div className="flex gap-4">
              <Button 
                onClick={onRefine}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Refining...
                  </>
                ) : (
                  'Refine'
                )}
              </Button>
              <Button 
                onClick={onSave}
                variant="outline"
                className="flex-1"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};