import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import usersData from '../data/users.json';

const Login: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: searchParams.get('role') || 'farmer'
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = usersData.find(
      u => u.email === formData.email && 
           u.password === formData.password && 
           u.role === formData.role
    );

    if (user) {
      // Store user data in localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect to appropriate dashboard
      const dashboardRoutes: { [key: string]: string } = {
        farmer: '/farmer-dashboard',
        consumer: '/consumer-dashboard',
        business: '/business-dashboard',
        coordinator: '/coordinator-dashboard',
        admin: '/admin-dashboard'
      };
      
      navigate(dashboardRoutes[formData.role]);
    } else {
      setError('Invalid credentials or role mismatch');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-page" style={{
      minHeight: '100vh',
      background: 'linear-gradient(rgba(74, 124, 89, 0.8), rgba(107, 142, 35, 0.8)), url("https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=1920") center/cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="login-card" style={{
        background: 'white',
        borderRadius: 'var(--border-radius)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'var(--shadow-hover)',
        animation: 'fadeInUp 0.6s ease'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: 'var(--primary-green)',
          fontSize: '2rem'
        }}>
          Welcome to KrishiSaarthi
        </h2>
        
        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: 'var(--border-radius)',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Login as</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="form-control form-select"
              required
            >
              <option value="farmer">Farmer 👨‍🌾</option>
              <option value="consumer">Consumer 🛒</option>
              <option value="business">Business 🏢</option>
              <option value="coordinator">Coordinator 🤝</option>
              <option value="admin">Admin 👨‍💼</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
            Login
          </button>
        </form>

        <div style={{ marginTop: '30px', padding: '20px', background: 'var(--bg-light)', borderRadius: 'var(--border-radius)' }}>
          <h4 style={{ marginBottom: '15px', color: 'var(--text-dark)' }}>Demo Credentials:</h4>
          <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
            <p><strong>Farmer:</strong> ayush@test.com / password</p>
            <p><strong>Consumer:</strong> uttam@test.com / password</p>
            <p><strong>Business:</strong> adarsh@test.com / password</p>
            <p><strong>Coordinator:</strong> kajal@test.com / password</p>
            <p><strong>Admin:</strong> prashant@test.com / password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;