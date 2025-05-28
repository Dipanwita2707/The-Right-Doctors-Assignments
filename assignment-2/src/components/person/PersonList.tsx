import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, UserPlus, RefreshCw, ChevronUp, ChevronDown } from 'lucide-react';
import { getPersons } from '../../api/personApi';
import { Person } from '../../types/Person';
import LoadingSpinner from '../common/LoadingSpinner';

const PersonList: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<keyof Person>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const fetchPersons = async () => {
    setLoading(true);
    try {
      const data = await getPersons();
      setPersons(data);
      setError(null);
    } catch (err) {
      setError('Failed to load persons. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleSort = (field: keyof Person) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPersons = [...persons].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const renderSortIcon = (field: keyof Person) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
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
          className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchPersons}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Person List</h1>
        <div className="flex space-x-2">
          <button 
            onClick={fetchPersons} 
            className="flex items-center px-3 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Refresh
          </button>
          <Link 
            to="/person/create" 
            className="flex items-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Add Person
          </Link>
        </div>
      </div>

      {persons.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No persons found in the database.</p>
          <Link 
            to="/person/create" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Your First Person
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name {renderSortIcon('name')}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('age')}
                >
                  <div className="flex items-center">
                    Age {renderSortIcon('age')}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('gender')}
                >
                  <div className="flex items-center">
                    Gender {renderSortIcon('gender')}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort('mobile')}
                >
                  <div className="flex items-center">
                    Mobile {renderSortIcon('mobile')}
                  </div>
                </th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedPersons.map((person) => (
                <tr key={person._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{person.name}</td>
                  <td className="py-3 px-4">{person.age}</td>
                  <td className="py-3 px-4">{person.gender}</td>
                  <td className="py-3 px-4">{person.mobile}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <Link 
                        to={`/person/edit/${person._id}`}
                        className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <Link 
                        to={`/person/delete/${person._id}`}
                        className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PersonList;