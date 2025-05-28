import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Person Management System</p>
        <p className="text-sm mt-1">Built with Node.js, React, and MongoDB</p>
      </div>
    </footer>
  );
};

export default Footer;