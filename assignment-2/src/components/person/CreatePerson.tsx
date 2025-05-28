import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { createPerson } from '../../api/personApi';
import { PersonFormData } from '../../types/Person';
import PersonForm from './PersonForm';

const CreatePerson: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (personData: PersonFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createPerson(personData);
      navigate('/person', { state: { message: 'Person created successfully!' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create person. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-1 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Create New Person</h1>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-md">
        <PersonForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
          submitLabel="Create Person"
        />
      </div>
    </div>
  );
};

export default CreatePerson;