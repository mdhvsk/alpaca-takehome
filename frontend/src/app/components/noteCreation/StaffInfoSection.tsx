import React from 'react';

interface StaffInfoProps {
  formData: {
    therapist_name: string;
    supervisor_name: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StaffInfoSection = ({ formData, onChange }: StaffInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Staff Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Therapist Name</label>
          <input
            type="text"
            name="therapist_name"
            className="w-full p-2 border rounded"
            value={formData.therapist_name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Supervisor Name</label>
          <input
            type="text"
            name="supervisor_name"
            className="w-full p-2 border rounded"
            value={formData.supervisor_name}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};