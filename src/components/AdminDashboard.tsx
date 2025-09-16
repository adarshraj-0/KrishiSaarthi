import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [kpis, setKpis] = useState({
    totalOrders: 0,
    farmersOnboarded: 0,
    revenue: 0,
    activeUsers: 0
  });

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    setCurrentUser(user);

    // Animate KPIs
    const animateKPIs = () => {
      const targets = { totalOrders: 15420, farmersOnboarded: 2580, revenue: 4850000, activeUsers: 8945 };
      let step = 0;
      const steps = 60;
      
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setKpis({
          totalOrders: Math.floor(targets.totalOrders * progress),
          farmersOnboarded: Math.floor(targets.farmersOnboarded * progress),
          revenue: Math.floor(targets.revenue * progress),
          activeUsers: Math.floor(targets.activeUsers * progress)
        });
        
        if (step >= steps) clearInterval(timer);
      }, 30);
    };
    
    setTimeout(animateKPIs, 500);
  }, [navigate]);

  if (!currentUser) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <div className="user-info">
              <img src={currentUser.avatar} alt="Profile" className="user-avatar" />
              <span style={{ marginLeft: '15px' }}>System Administrator</span>
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
        {/* KPI Cards */}
        <div className="section">
          <h2 className="section-title">Key Performance Indicators</h2>
          <div className="grid grid-4">
            <div className="card text-center pulse">
              <div className="quick-menu-icon" style={{ color: 'var(--primary-green)' }}>📦</div>
              <div className="counter">{kpis.totalOrders.toLocaleString()}</div>
              <p>Total Orders</p>
              <small style={{ color: 'var(--secondary-green)' }}>↗ +12% this month</small>
            </div>
            <div className="card text-center pulse">
              <div className="quick-menu-icon" style={{ color: 'var(--accent-orange)' }}>👨‍🌾</div>
              <div className="counter">{kpis.farmersOnboarded.toLocaleString()}</div>
              <p>Farmers Onboarded</p>
              <small style={{ color: 'var(--secondary-green)' }}>↗ +8% this month</small>
            </div>
            <div className="card text-center pulse">
              <div className="quick-menu-icon" style={{ color: 'var(--warm-yellow)' }}>💰</div>
              <div className="counter">₹{(kpis.revenue / 100000).toFixed(1)}L</div>
              <p>Total Revenue</p>
              <small style={{ color: 'var(--secondary-green)' }}>↗ +15% this month</small>
            </div>
            <div className="card text-center pulse">
              <div className="quick-menu-icon" style={{ color: 'var(--light-green)' }}>👥</div>
              <div className="counter">{kpis.activeUsers.toLocaleString()}</div>
              <p>Active Users</p>
              <small style={{ color: 'var(--secondary-green)' }}>↗ +20% this month</small>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="section">
          <h2 className="section-title">Analytics Overview</h2>
          <div className="grid grid-2">
            <div className="card">
              <h4>Sales Trend (Last 6 Months)</h4>
              <div style={{ 
                height: '200px', 
                background: 'var(--bg-light)', 
                borderRadius: 'var(--border-radius)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginTop: '20px',
                position: 'relative'
              }}>
                <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                  <polyline
                    fill="none"
                    stroke="var(--primary-green)"
                    strokeWidth="3"
                    points="20,160 80,140 140,100 200,120 260,80 320,60"
                  />
                  <circle cx="20" cy="160" r="4" fill="var(--primary-green)" />
                  <circle cx="80" cy="140" r="4" fill="var(--primary-green)" />
                  <circle cx="140" cy="100" r="4" fill="var(--primary-green)" />
                  <circle cx="200" cy="120" r="4" fill="var(--primary-green)" />
                  <circle cx="260" cy="80" r="4" fill="var(--primary-green)" />
                  <circle cx="320" cy="60" r="4" fill="var(--primary-green)" />
                </svg>
                <p style={{ color: 'var(--text-light)', zIndex: 1 }}>📈 Upward trend in sales</p>
              </div>
            </div>
            <div className="card">
              <h4>Regional Performance</h4>
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <span>Punjab</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="progress-bar" style={{ width: '100px' }}>
                      <div className="progress-fill" style={{ width: '85%' }}></div>
                    </div>
                    <span>85%</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <span>Haryana</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="progress-bar" style={{ width: '100px' }}>
                      <div className="progress-fill" style={{ width: '72%' }}></div>
                    </div>
                    <span>72%</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <span>Gujarat</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="progress-bar" style={{ width: '100px' }}>
                      <div className="progress-fill" style={{ width: '68%' }}></div>
                    </div>
                    <span>68%</span>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                  <span>Uttar Pradesh</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="progress-bar" style={{ width: '100px' }}>
                      <div className="progress-fill" style={{ width: '55%' }}></div>
                    </div>
                    <span>55%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Farmer Onboarding Requests */}
        <div className="section">
          <h2 className="section-title">Farmer Onboarding Requests</h2>
          <div className="table">
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Farmer Name</th>
                  <th>Location</th>
                  <th>Farm Size</th>
                  <th>Documents</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#REQ001</td>
                  <td>Amit Sharma</td>
                  <td>Rajasthan</td>
                  <td>5 acres</td>
                  <td><span className="badge badge-success">Complete</span></td>
                  <td><span className="badge badge-warning">Pending</span></td>
                  <td>
                    <button className="btn btn-primary" style={{ fontSize: '12px', padding: '5px 10px', marginRight: '5px' }}>
                      Approve
                    </button>
                    <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px 10px' }}>
                      Reject
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>#REQ002</td>
                  <td>Kavita Devi</td>
                  <td>Madhya Pradesh</td>
                  <td>3 acres</td>
                  <td><span className="badge badge-warning">Incomplete</span></td>
                  <td><span className="badge badge-warning">Pending</span></td>
                  <td>
                    <button className="btn btn-primary" style={{ fontSize: '12px', padding: '5px 10px', marginRight: '5px' }}>
                      Approve
                    </button>
                    <button className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px 10px' }}>
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Complaints Management */}
        <div className="section">
          <h2 className="section-title">Support Complaints</h2>
          <div className="grid grid-3">
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h5>Payment Delay</h5>
                <span className="badge badge-danger">High Priority</span>
              </div>
              <p><strong>Ticket:</strong> #TKT001</p>
              <p><strong>User:</strong> Farmer - Ramesh Kumar</p>
              <p>Payment for last order still pending after 15 days.</p>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>
                Resolve
              </button>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h5>Quality Issue</h5>
                <span className="badge badge-warning">Medium Priority</span>
              </div>
              <p><strong>Ticket:</strong> #TKT002</p>
              <p><strong>User:</strong> Consumer - Priya Singh</p>
              <p>Received damaged vegetables in the last order.</p>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '15px' }}>
                Investigate
              </button>
            </div>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h5>App Bug</h5>
                <span className="badge badge-success">Low Priority</span>
              </div>
              <p><strong>Ticket:</strong> #TKT003</p>
              <p><strong>User:</strong> Business - TechCorp</p>
              <p>Unable to upload bulk order CSV file.</p>
              <button className="btn btn-secondary" style={{ width: '100%', marginTop: '15px' }}>
                Assign Developer
              </button>
            </div>
          </div>
        </div>

        {/* System Notifications */}
        <div className="section">
          <h2 className="section-title">System Notifications</h2>
          <div className="card">
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <div style={{ padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--secondary-green)' }}></div>
                <div>
                  <p style={{ margin: '0', fontWeight: '600' }}>System Update Deployed</p>
                  <small style={{ color: 'var(--text-light)' }}>Version 2.1.3 - Bug fixes and performance improvements</small>
                </div>
                <small style={{ color: 'var(--text-light)', marginLeft: 'auto' }}>2 mins ago</small>
              </div>
              <div style={{ padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--primary-green)' }}></div>
                <div>
                  <p style={{ margin: '0', fontWeight: '600' }}>Data Sync Complete</p>
                  <small style={{ color: 'var(--text-light)' }}>All farmer and crop data synchronized successfully</small>
                </div>
                <small style={{ color: 'var(--text-light)', marginLeft: 'auto' }}>15 mins ago</small>
              </div>
              <div style={{ padding: '15px 0', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-orange)' }}></div>
                <div>
                  <p style={{ margin: '0', fontWeight: '600' }}>Server Maintenance Scheduled</p>
                  <small style={{ color: 'var(--text-light)' }}>Planned maintenance on March 20th from 2 AM to 4 AM</small>
                </div>
                <small style={{ color: 'var(--text-light)', marginLeft: 'auto' }}>1 hour ago</small>
              </div>
              <div style={{ padding: '15px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--light-green)' }}></div>
                <div>
                  <p style={{ margin: '0', fontWeight: '600' }}>New Feature Released</p>
                  <small style={{ color: 'var(--text-light)' }}>Blockchain verification now available for all transactions</small>
                </div>
                <small style={{ color: 'var(--text-light)', marginLeft: 'auto' }}>3 hours ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;