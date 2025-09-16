import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import FarmerDashboard from './components/FarmerDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import BusinessDashboard from './components/BusinessDashboard';
import CoordinatorDashboard from './components/CoordinatorDashboard';
import AdminDashboard from './components/AdminDashboard';
import './styles/global.css';
import './styles/components.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes with navbar */}
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path="/login" element={
            <>
              <Navbar />
              <Login />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <div style={{ paddingTop: '100px', textAlign: 'center' }}>
                <h1>About KrishiSaarthi</h1>
                <p>Coming Soon...</p>
              </div>
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <div style={{ paddingTop: '100px', textAlign: 'center' }}>
                <h1>Contact Us</h1>
                <p>Coming Soon...</p>
              </div>
            </>
          } />
          
          {/* Dashboard routes without navbar */}
          <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
          <Route path="/business-dashboard" element={<BusinessDashboard />} />
          <Route path="/coordinator-dashboard" element={<CoordinatorDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;