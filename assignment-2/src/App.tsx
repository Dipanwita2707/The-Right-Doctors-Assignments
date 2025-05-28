import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PersonList from './components/person/PersonList';
import CreatePerson from './components/person/CreatePerson';
import EditPerson from './components/person/EditPerson';
import DeletePerson from './components/person/DeletePerson';
import NotFound from './components/common/NotFound';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<PersonList />} />
            <Route path="/person" element={<PersonList />} />
            <Route path="/person/create" element={<CreatePerson />} />
            <Route path="/person/edit/:id" element={<EditPerson />} />
            <Route path="/person/delete/:id" element={<DeletePerson />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;