import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Resources from './pages/Resources';
import Personnel from './pages/Personnel';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Reference from './pages/Reference';
import Journal from './pages/Journal';
import ResourcesJournal from './pages/ResourcesJournal';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import EmployeeList from './pages/EmployeeList';
import Timesheet from './pages/Timesheet';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="p-6 max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/personnel" element={<Personnel />} />
              <Route path="/products" element={<Products />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/reference" element={<Reference />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/resources-journal" element={<ResourcesJournal />} />
              <Route path="/reports/*" element={<Reports />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/timesheet" element={<Timesheet />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;