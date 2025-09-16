import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import farmersData from '../data/farmers.json';
import cropsData from '../data/crops.json';

const CoordinatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'coordinator') {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  const getFarmerCrops = (farmerId: number) => {
    return cropsData.filter(crop => crop.farmerId === farmerId);
  };

  if (!currentUser) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <h1 className="dashboard-title">Coordinator Dashboard</h1>
            <div className="user-info">
              <img src={currentUser.avatar} alt="Profile" className="user-avatar" />
              <span style={{ marginLeft: '15px' }}>Village Coordinator</span>
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
        {/* Quick Stats */}
        <div className="grid grid-4" style={{ marginBottom: '30px' }}>
          <div className="card text-center">
            <div className="counter">12</div>
            <p>Active Farmers</p>
          </div>
          <div className="card text-center">
            <div className="counter">45</div>
            <p>Pending Orders</p>
          </div>
          <div className="card text-center">
            <div className="counter">8</div>
            <p>Vehicles Available</p>
          </div>
          <div className="card text-center">
            <div className="counter">3</div>
            <p>Support Requests</p>
          </div>
        </div>

        {/* Village Map */}
        <div className="section">
          <h2 className="section-title">Village Overview</h2>
          <div className="card">
            <div style={{ 
              height: '300px', 
              background: 'linear-gradient(135deg, #90c695 0%, #6b8e23 100%)', 
              borderRadius: 'var(--border-radius)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ textAlign: 'center', color: 'white' }}>
                <h3>🗺️ Interactive Village Map</h3>
                <p>Showing farmer locations, storage centers, and transport routes</p>
              </div>
              {/* Mock farmer locations */}
              <div style={{ position: 'absolute', top: '20%', left: '30%', background: 'white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                👨‍🌾
              </div>
              <div style={{ position: 'absolute', top: '60%', left: '60%', background: 'white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                👨‍🌾
              </div>
              <div style={{ position: 'absolute', top: '40%', left: '70%', background: 'white', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                👨‍🌾
              </div>
            </div>
          </div>
        </div>

        {/* Farmers Management */}
        <div className="section">
          <h2 className="section-title">Farmers in Village</h2>
          <div className="grid grid-3">
            {farmersData.map((farmer) => {
              const farmerCrops = getFarmerCrops(farmer.id);
              return (
                <div key={farmer.id} className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <img 
                      src={farmer.avatar} 
                      alt={farmer.name}
                      style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <h4>{farmer.name}</h4>
                      <p style={{ color: 'var(--text-light)', margin: '0' }}>{farmer.location}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                        <span>⭐ {farmer.rating}</span>
                        {farmer.organic && <span className="badge badge-organic">Organic</span>}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5>Current Crops:</h5>
                    {farmerCrops.map(crop => (
                      <div key={crop.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                        <span>{crop.crop}</span>
                        <span>{crop.quantity}kg</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>
                    Contact Farmer
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Vehicle Allocation */}
        <div className="section">
          <h2 className="section-title">Vehicle Management</h2>
          <div className="table">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Driver</th>
                  <th>Assigned Crops</th>
                  <th>Route</th>
                  <th>Status</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>🚛 Truck #TK001</td>
                  <td>Raj Singh</td>
                  <td>Wheat, Rice (500kg)</td>
                  <td>Village → Delhi</td>
                  <td><span className="badge badge-success">En Route</span></td>
                  <td>2 hours</td>
                </tr>
                <tr>
                  <td>🚐 Tempo #TP002</td>
                  <td>Rishika Raj</td>
                  <td>Vegetables (200kg)</td>
                  <td>Village → Local Market</td>
                  <td><span className="badge badge-warning">Loading</span></td>
                  <td>30 mins</td>
                </tr>
                <tr>
                  <td>🚚 Mini Truck #MT003</td>
                  <td>Suraj patel</td>
                  <td>Tomatoes (150kg)</td>
                  <td>Village → Gurgaon</td>
                  <td><span className="badge badge-success">Available</span></td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="section">
          <h2 className="section-title">Village Performance</h2>
          <div className="grid grid-2">
            <div className="card">
              <h4>Top Performing Farmer</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px' }}>
                <img 
                  src={farmersData[2].avatar} 
                  alt={farmersData[2].name}
                  style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                />
                <div>
                  <h5>{farmersData[2].name}</h5>
                  <p>Total Sales: ₹{farmersData[2].totalSales.toLocaleString()}</p>
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>Performance</span>
                  <span>92%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
            <div className="card">
              <h4>Monthly Summary</h4>
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <span>Total Orders</span>
                  <strong>156</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <span>Revenue Generated</span>
                  <strong>₹2,45,000</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <span>Delivery Success</span>
                  <strong>98%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                  <span>Farmers Active</span>
                  <strong>12/15</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Requests */}
        <div className="section">
          <h2 className="section-title">Support Requests</h2>
          <div className="grid grid-3">
            <div className="card">
              <h5>Irrigation Issue</h5>
              <p><strong>From:</strong> Ramesh Kumar</p>
              <p>Water pump not working, need immediate help for crop irrigation.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button className="btn btn-primary" style={{ fontSize: '12px', padding: '8px 15px' }}>
                  Assign Technician
                </button>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '8px 15px' }}>
                  Mark Resolved
                </button>
              </div>
            </div>
            <div className="card">
              <h5>Transport Delay</h5>
              <p><strong>From:</strong> Rishika Raj</p>
              <p>Pickup scheduled for yesterday hasn't arrived yet.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button className="btn btn-primary" style={{ fontSize: '12px', padding: '8px 15px' }}>
                  Reschedule
                </button>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '8px 15px' }}>
                  Contact Driver
                </button>
              </div>
            </div>
            <div className="card">
              <h5>Payment Pending</h5>
              <p><strong>From:</strong> Suresh Patel</p>
              <p>Haven't received payment for last week's delivery.</p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <button className="btn btn-primary" style={{ fontSize: '12px', padding: '8px 15px' }}>
                  Process Payment
                </button>
                <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '8px 15px' }}>
                  Contact Finance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;