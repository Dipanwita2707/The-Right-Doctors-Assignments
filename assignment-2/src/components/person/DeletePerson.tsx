import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { getPerson, deletePerson } from '../../api/personApi';
import { Person } from '../../types/Person';
import LoadingSpinner from '../common/LoadingSpinner';

const DeletePerson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const handleDelete = async () => {
    if (!id) return;
    
    setIsDeleting(true);
    setError(null);
    
    try {
      await deletePerson(id);
      navigate('/person', { state: { message: 'Person deleted successfully!' } });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete person. Please try again.');
      setIsDeleting(false);
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-1 rounded-full hover:bg-gray-200 transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Delete Person</h1>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-md">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-semibold text-red-700 mb-2">Confirm Deletion</h2>
            <p className="text-gray-700 mb-4">Are you sure you want to delete this person? This action cannot be undone.</p>
            
            <div className="bg-white p-4 rounded-md border border-gray-300 mb-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{person.name}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-sm text-gray-900">{person.age}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900">{person.gender}</dd>
                </div>
                <div className="col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                  <dd className="mt-1 text-sm text-gray-900">{person.mobile}</dd>
                </div>
              </dl>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/person')}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ${
                  isDeleting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isDeleting ? 'Deleting...' : 'Delete Person'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePerson;