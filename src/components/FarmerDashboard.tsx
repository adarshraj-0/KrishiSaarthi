import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cropsData from '../data/crops.json';

const FarmerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [crops, setCrops] = useState(cropsData);
  const [earnings, setEarnings] = useState({ today: 0, thisMonth: 0, total: 0 });

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'farmer') {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);
    
    // Simulate earnings calculation
    const animateEarnings = () => {
      const targets = { today: 2500, thisMonth: 45000, total: 150000 };
      let step = 0;
      const steps = 60;
      
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setEarnings({
          today: Math.floor(targets.today * progress),
          thisMonth: Math.floor(targets.thisMonth * progress),
          total: Math.floor(targets.total * progress)
        });
        
        if (step >= steps) clearInterval(timer);
      }, 30);
    };
    
    setTimeout(animateEarnings, 500);
  }, [navigate]);

  if (!currentUser) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <h1 className="dashboard-title">Farmer Dashboard</h1>
            <div className="user-info">
              <img src={currentUser.avatar} alt="Profile" className="user-avatar" />
              <span className="wallet-balance">₹{earnings.total.toLocaleString()}</span>
              <span style={{ color: 'var(--text-light)' }}>Total Earnings</span>
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
        {/* Quick Menu */}
        <div className="quick-menu">
          <div className="quick-menu-item">
            <div className="quick-menu-icon">🌾</div>
            <div>My Crops</div>
          </div>
          <div className="quick-menu-item">
            <div className="quick-menu-icon">📋</div>
            <div>Orders</div>
          </div>
          <div className="quick-menu-item">
            <div className="quick-menu-icon">💰</div>
            <div>Earnings</div>
          </div>
          <div className="quick-menu-item">
            <div className="quick-menu-icon">❓</div>
            <div>Help</div>
          </div>
          <div className="quick-menu-item">
            <div className="quick-menu-icon">🛡️</div>
            <div>Insurance</div>
          </div>
        </div>

        {/* Earnings Summary */}
        <div className="section">
          <h2 className="section-title">Earnings Summary</h2>
          <div className="grid grid-3">
            <div className="card text-center">
              <div className="counter">₹{earnings.today.toLocaleString()}</div>
              <p>Today's Earnings</p>
            </div>
            <div className="card text-center">
              <div className="counter">₹{earnings.thisMonth.toLocaleString()}</div>
              <p>This Month</p>
            </div>
            <div className="card text-center">
              <div className="counter">₹{earnings.total.toLocaleString()}</div>
              <p>Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Crop Management */}
        <div className="section">
          <h2 className="section-title">My Crops</h2>
          <div className="grid grid-2">
            {crops.filter(crop => crop.farmerId === 1).map((crop) => (
              <div key={crop.id} className="product-card">
                <img src={crop.image} alt={crop.crop} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{crop.crop}</h3>
                  <p className="product-farmer">Quantity: {crop.quantity} kg</p>
                  <div className="product-price">₹{crop.price}/kg</div>
                  <div className="product-badges">
                    {crop.organic && <span className="badge badge-organic">Organic</span>}
                    <span className="badge badge-success">Available</span>
                  </div>
                  <div style={{ marginTop: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span>Pre-booked</span>
                      <span>{crop.prebooked}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${crop.prebooked}%` }}
                      ></div>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-light)', fontSize: '14px', marginTop: '10px' }}>
                    Harvest Date: {new Date(crop.harvestDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Add New Crop */}
          <div className="card" style={{ marginTop: '30px' }}>
            <h3>Add New Crop</h3>
            <div className="grid grid-2">
              <div className="form-group">
                <label className="form-label">Crop Name</label>
                <input type="text" className="form-control" placeholder="Enter crop name" />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity (kg)</label>
                <input type="number" className="form-control" placeholder="Enter quantity" />
              </div>
              <div className="form-group">
                <label className="form-label">Price per kg (₹)</label>
                <input type="number" className="form-control" placeholder="Enter price" />
              </div>
              <div className="form-group">
                <label className="form-label">Harvest Date</label>
                <input type="date" className="form-control" />
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" />
                <span>Organic Certified</span>
              </label>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '20px' }}>
              Add Crop
            </button>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="section">
          <h2 className="section-title">Recent Orders</h2>
          <div className="table">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD001</td>
                  <td>Wheat</td>
                  <td>50 kg</td>
                  <td>₹1,250</td>
                  <td><span className="badge badge-success">Delivered</span></td>
                </tr>
                <tr>
                  <td>#ORD002</td>
                  <td>Rice</td>
                  <td>30 kg</td>
                  <td>₹900</td>
                  <td><span className="badge badge-warning">In Transit</span></td>
                </tr>
                <tr>
                  <td>#ORD003</td>
                  <td>Tomatoes</td>
                  <td>25 kg</td>
                  <td>₹1,000</td>
                  <td><span className="badge badge-warning">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips Section */}
        <div className="section">
          <h2 className="section-title">Farming Tips</h2>
          <div className="grid grid-2">
            <div className="card">
              <h4>🌱 Organic Farming</h4>
              <p>Use organic fertilizers to get 20-30% better prices for your crops.</p>
            </div>
            <div className="card">
              <h4>📅 Pre-booking Benefits</h4>
              <p>Enable pre-booking to guarantee sales before harvest.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;