import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getPerson, updatePerson } from '../../api/personApi';
import { Person, PersonFormData } from '../../types/Person';
import PersonForm from './PersonForm';
import LoadingSpinner from '../common/LoadingSpinner';

const EditPerson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerson = async () => {
      if (!id) return;
      
      try {
        const data = await getPerson(id);
        setPerson(data);
        setError(null);
      } catch (err) {
        setError('Failed to load person data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  const handleSubmit = async (personData: PersonFormData) => {
    if (!id) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updatePerson(id, personData);
      navigate('/person', { state: { message: 'Person updated successfully!' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update person. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <button 
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Warning!</strong>
        <span className="block sm:inline"> Person not found.</span>
        <button 
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/person')}
        >
          Back to List
        </button>
      </div>
    );
  }

  const initialData: PersonFormData = {
    name: person.name,
    age: person.age,
    gender: person.gender,
    mobile: person.mobile
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
        <h1 className="text-2xl font-bold text-gray-800">Edit Person</h1>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-md">
        <PersonForm 
          initialData={initialData}
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
          submitLabel="Update Person"
        />
      </div>
    </div>
  );
};

export default EditPerson;