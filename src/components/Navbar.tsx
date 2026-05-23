import { NavLink } from 'react-router-dom';
import { Briefcase, Home, PlusCircle, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #e2e8f0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '75px'
      }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
            color: 'white',
            width: '45px',
            height: '45px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Briefcase size={26} />
          </div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#1e2937',
            letterSpacing: '-0.5px'
          }}>
            JobSphere
          </h1>
        </div>

        {/* Navigation Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: '#f8fafc',
          padding: '6px',
          borderRadius: '9999px'
        }}>
          
          <NavLink 
            to="/" 
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 28px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              color: isActive ? '#2563eb' : '#475569',
              backgroundColor: isActive ? 'white' : 'transparent',
              boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.3s'
            })}
          >
            <Home size={20} />
            Browse Jobs
          </NavLink>

          <NavLink 
            to="/post-job" 
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 28px',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px',
              color: isActive ? '#2563eb' : '#475569',
              backgroundColor: isActive ? 'white' : 'transparent',
              boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.3s'
            })}
          >
            <PlusCircle size={20} />
            Post a Job
          </NavLink>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#f1f5f9',
            color: '#334155',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '9999px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '16px'
          }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          >
            <User size={20} />
            Login
          </button>
        </div>

      </div>
    </nav>
  );
}