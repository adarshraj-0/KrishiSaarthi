import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cropsData from '../data/crops.json';
import farmersData from '../data/farmers.json';

const BusinessDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('offers');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'farmer', message: 'Hello! I can provide 500kg wheat at ₹24/kg', time: '10:30 AM' },
    { id: 2, sender: 'business', message: 'Can you do ₹22/kg for bulk order?', time: '10:35 AM' },
    { id: 3, sender: 'farmer', message: 'For 500kg+, I can do ₹23/kg final price', time: '10:40 AM' }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'business') {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  const getFarmerName = (farmerId: number) => {
    const farmer = farmersData.find(f => f.id === farmerId);
    return farmer ? farmer.name : 'Unknown';
  };

  if (!currentUser) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <h1 className="dashboard-title">Business Dashboard</h1>
            <div className="user-info">
              <img src={currentUser.avatar} alt="Profile" className="user-avatar" />
              <span style={{ marginLeft: '15px' }}>Business Portal</span>
              <button 
                onClick={() => {
                  localStorage.removeItem('currentUser');
                  navigate('/');
                }}
                className="btn btn-secondary"
                style={{ marginLeft: '20px' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Tab Navigation */}
        <div className="quick-menu" style={{ marginBottom: '30px' }}>
          <div 
            className={`quick-menu-item ${activeTab === 'offers' ? 'active' : ''}`}
            onClick={() => setActiveTab('offers')}
          >
            <div className="quick-menu-icon">📦</div>
            <div>Bulk Offers</div>
          </div>
          <div 
            className={`quick-menu-item ${activeTab === 'contracts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contracts')}
          >
            <div className="quick-menu-icon">📋</div>
            <div>Contracts</div>
          </div>
          <div 
            className={`quick-menu-item ${activeTab === 'negotiation' ? 'active' : ''}`}
            onClick={() => setActiveTab('negotiation')}
          >
            <div className="quick-menu-icon">💬</div>
            <div>Negotiation</div>
          </div>
          <div 
            className={`quick-menu-item ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
          >
            <div className="quick-menu-icon">🧾</div>
            <div>Invoices</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="card" style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <input 
              type="text" 
              placeholder="Search crops..." 
              className="form-control"
              style={{ flex: 1 }}
            />
            <select className="form-control form-select" style={{ width: '200px' }}>
              <option>All Regions</option>
              <option>Punjab</option>
              <option>Haryana</option>
              <option>Gujarat</option>
            </select>
            <button className="btn btn-primary">Search</button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'offers' && (
          <div className="section">
            <h2 className="section-title">Bulk Offers</h2>
            <div className="grid grid-2">
              {cropsData.map((crop) => (
                <div key={crop.id} className="card">
                  <div style={{ display: 'flex', gap: '20px' }}>
                    <img 
                      src={crop.image} 
                      alt={crop.crop}
                      style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3>{crop.crop}</h3>
                      <p>Farmer: {getFarmerName(crop.farmerId)}</p>
                      <p>Quantity: {crop.quantity} kg available</p>
                      <div className="product-price">₹{crop.price}/kg</div>
                      {crop.organic && <span className="badge badge-organic">Organic</span>}
                      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                        <button className="btn btn-primary">Negotiate</button>
                        <button className="btn btn-secondary">Quick Order</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contracts' && (
          <div className="section">
            <h2 className="section-title">Active Contracts</h2>
            <div className="table">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Contract ID</th>
                    <th>Crop</th>
                    <th>Farmer</th>
                    <th>Quantity</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#CON001</td>
                    <td>Wheat</td>
                    <td>Ramesh Kumar</td>
                    <td>1000 kg/month</td>
                    <td>6 months</td>
                    <td><span className="badge badge-success">Active</span></td>
                    <td><button className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px 10px' }}>View</button></td>
                  </tr>
                  <tr>
                    <td>#CON002</td>
                    <td>Rice</td>
                    <td>Priya Sharma</td>
                    <td>800 kg/month</td>
                    <td>12 months</td>
                    <td><span className="badge badge-warning">Pending</span></td>
                    <td><button className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px 10px' }}>View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'negotiation' && (
          <div className="section">
            <h2 className="section-title">Negotiation Chat</h2>
            <div className="card">
              <div className="chat-container">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`chat-message ${msg.sender === 'business' ? 'sent' : ''}`}>
                    <div className="chat-bubble">
                      <p>{msg.message}</p>
                      <small style={{ opacity: 0.7 }}>{msg.time}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="form-control"
                  style={{ flex: 1 }}
                />
                <button className="btn btn-primary">Send</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invoices' && (
          <div className="section">
            <h2 className="section-title">Invoices & Bills</h2>
            <div className="grid grid-3">
              <div className="card text-center">
                <h4>Invoice #INV001</h4>
                <p>Wheat Purchase</p>
                <div className="product-price">₹25,000</div>
                <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Date: March 15, 2024</p>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>
                  Download PDF
                </button>
              </div>
              <div className="card text-center">
                <h4>Invoice #INV002</h4>
                <p>Rice Purchase</p>
                <div className="product-price">₹18,000</div>
                <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Date: March 10, 2024</p>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>
                  Download PDF
                </button>
              </div>
              <div className="card text-center">
                <h4>Invoice #INV003</h4>
                <p>Mixed Vegetables</p>
                <div className="product-price">₹12,500</div>
                <p style={{ color: 'var(--text-light)', fontSize: '14px' }}>Date: March 5, 2024</p>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>
                  Download PDF
                </button>
              </div>
            </div>

            {/* Analytics Snapshot */}
            <div className="card" style={{ marginTop: '30px' }}>
              <h4>Monthly Purchase Analytics</h4>
              <div style={{ height: '200px', background: 'var(--bg-light)', borderRadius: 'var(--border-radius)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
                <p style={{ color: 'var(--text-light)' }}>📊 Chart showing monthly bulk purchase trends would be displayed here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;