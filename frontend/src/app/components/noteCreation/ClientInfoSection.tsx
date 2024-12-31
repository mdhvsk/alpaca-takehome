import React from 'react';

interface ClientInfoProps {
  formData: {
    client_name: string;
    client_id: string;
    client_age: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ClientInfoSection = ({ formData, onChange }: ClientInfoProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Client Information</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Client Name</label>
          <input
            type="text"
            name="client_name"
            className="w-full p-2 border rounded"
            value={formData.client_name}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Client ID</label>
          <input
            type="text"
            name="client_id"
            className="w-full p-2 border rounded"
            value={formData.client_id}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <input
            type="number"
            name="client_age"
            className="w-full p-2 border rounded"
            value={formData.client_age}
            onChange={onChange}
            required
          />
        </div>
      </div>
    </div>
  );
};