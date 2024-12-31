import React from 'react';

interface SessionDetailsProps {
  formData: {
    session_date: string;
    start_time: string;
    duration: number;
    session_type: string;
    location: string;
    parent_present: boolean;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SessionDetailsSection = ({ 
  formData, 
  onChange,
  onCheckboxChange 
}: SessionDetailsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Session Details</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="session_date"
            className="w-full p-2 border rounded"
            value={formData.session_date}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Start Time</label>
          <input
            type="time"
            name="start_time"
            className="w-full p-2 border rounded"
            value={formData.start_time}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            className="w-full p-2 border rounded"
            value={formData.duration}
            onChange={onChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Session Type</label>
          <select 
            name="session_type"
            className="w-full p-2 border rounded"
            value={formData.session_type}
            onChange={onChange}
            required
          >
            <option value="individual">Individual</option>
            <option value="group">Group</option>
            <option value="parent-training">Parent Training</option>
            <option value="assessment">Assessment</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <select 
            name="location"
            className="w-full p-2 border rounded"
            value={formData.location}
            onChange={onChange}
            required
          >
            <option value="clinic">Clinic</option>
            <option value="home">Home</option>
            <option value="school">School</option>
            <option value="telehealth">Telehealth</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="parent_present"
            className="rounded border-gray-300"
            checked={formData.parent_present}
            onChange={onCheckboxChange}
          />
          <span className="text-sm font-medium">Parent/Caregiver Present</span>
        </label>
      </div>
    </div>
  );
};