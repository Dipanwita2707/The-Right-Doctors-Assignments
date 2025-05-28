import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-semibold">
            <Users className="h-6 w-6" />
            <span>Person Manager</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link 
              to="/person" 
              className="px-3 py-2 rounded hover:bg-blue-700 transition duration-150"
            >
              View All
            </Link>
            <Link 
              to="/person/create" 
              className="flex items-center space-x-1 px-3 py-2 bg-green-600 rounded hover:bg-green-700 transition duration-150"
            >
              <Plus className="h-4 w-4" />
              <span>Add Person</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;