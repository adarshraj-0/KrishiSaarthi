import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cropsData from '../data/crops.json';
import farmersData from '../data/farmers.json';

const ConsumerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [crops, setCrops] = useState(cropsData);
  const [cart, setCart] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    organic: false,
    nearby: false,
    maxPrice: 100
  });

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'consumer') {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);
  }, [navigate]);

  const getFarmerName = (farmerId: number) => {
    const farmer = farmersData.find(f => f.id === farmerId);
    return farmer ? farmer.name : 'Unknown';
  };

  const addToCart = (crop: any) => {
    setCart([...cart, { ...crop, quantity: 1 }]);
  };

  const filteredCrops = crops.filter(crop => {
    if (filters.organic && !crop.organic) return false;
    if (crop.price > filters.maxPrice) return false;
    return true;
  });

  if (!currentUser) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <h1 className="dashboard-title">Consumer Dashboard</h1>
            <div className="user-info">
              <div className="search-container" style={{ marginRight: '20px' }}>
                <input 
                  type="text" 
                  placeholder="Search crops..." 
                  className="form-control"
                  style={{ width: '300px' }}
                />
              </div>
              <div className="cart-icon" style={{ position: 'relative', marginRight: '20px' }}>
                <span style={{ fontSize: '24px' }}>🛒</span>
                {cart.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'var(--accent-orange)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {cart.length}
                  </span>
                )}
              </div>
              <img src={currentUser.avatar} alt="Profile" className="user-avatar" />
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
        <div style={{ display: 'flex', gap: '30px' }}>
          {/* Sidebar Filters */}
          <div style={{ width: '300px' }}>
            <div className="card">
              <h3>Filters</h3>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input 
                    type="checkbox" 
                    checked={filters.organic}
                    onChange={(e) => setFilters({...filters, organic: e.target.checked})}
                  />
                  <span>Organic Only ✅</span>
                </label>
              </div>
              <div className="form-group">
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input 
                    type="checkbox"
                    checked={filters.nearby}
                    onChange={(e) => setFilters({...filters, nearby: e.target.checked})}
                  />
                  <span>Nearby Farmers ✅</span>
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Max Price: ₹{filters.maxPrice}</label>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                  className="form-control"
                />
              </div>
            </div>

            {/* Subscription Box */}
            <div className="card" style={{ marginTop: '20px' }}>
              <h4>🥬 Weekly Veg Box</h4>
              <p>Get fresh vegetables delivered weekly</p>
              <div className="badge badge-success">Active</div>
              <button className="btn btn-primary" style={{ marginTop: '15px', width: '100%' }}>
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div style={{ flex: 1 }}>
            <h2 style={{ marginBottom: '30px' }}>Available Crops</h2>
            <div className="grid grid-3">
              {filteredCrops.map((crop) => (
                <div key={crop.id} className="product-card">
                  <img src={crop.image} alt={crop.crop} className="product-image" />
                  <div className="product-info">
                    <h3 className="product-name">{crop.crop}</h3>
                    <p className="product-farmer">By {getFarmerName(crop.farmerId)}</p>
                    <div className="product-price">₹{crop.price}/kg</div>
                    <div className="product-badges">
                      {crop.organic && <span className="badge badge-organic">Organic</span>}
                      <span className="badge badge-success">Available</span>
                    </div>
                    <button 
                      className="btn btn-primary" 
                      style={{ width: '100%', marginTop: '15px' }}
                      onClick={() => addToCart(crop)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Tracking */}
            <div className="section">
              <h3>Order Tracking</h3>
              <div className="card">
                <h4>Order #ORD001 - Fresh Vegetables</h4>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker completed"></div>
                    <div className="timeline-content">
                      <h5>Order Placed</h5>
                      <p>Your order has been confirmed</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker completed"></div>
                    <div className="timeline-content">
                      <h5>Harvested</h5>
                      <p>Crops have been freshly harvested</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h5>In Transit</h5>
                      <p>On the way to your location</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h5>Delivered</h5>
                      <p>Estimated delivery in 2 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="section">
              <h3>You May Also Like</h3>
              <div className="grid grid-4">
                {cropsData.slice(0, 4).map((crop) => (
                  <div key={`rec-${crop.id}`} className="card text-center">
                    <img 
                      src={crop.image} 
                      alt={crop.crop} 
                      style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--border-radius)' }}
                    />
                    <h4 style={{ margin: '10px 0' }}>{crop.crop}</h4>
                    <div className="product-price">₹{crop.price}/kg</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;