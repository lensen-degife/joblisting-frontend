import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Search, Clock } from 'lucide-react';
import type { Post } from '../types';

export default function JobList() {
  const [jobs, setJobs] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState<Post[]>([]);

  const fetchJobs = async (query = '') => {
    setLoading(true);
    try {
      const url = query 
        ? `api/posts/${encodeURIComponent(query)}`
        : 'api/allPosts';
      
      const res = await api.get(url);
      const data = Array.isArray(res.data) ? res.data : [];
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = jobs.filter(job =>
        job.profile?.toLowerCase().includes(term) ||
        job.desc?.toLowerCase().includes(term) ||
        job.techs?.some(tech => tech.toLowerCase().includes(term)) ||
        job.exp?.toString().includes(term)
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, jobs]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(to right, #2563eb, #4f46e5)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '16px' }}>
          Find Your Next Job
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>Search through available positions</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Search Bar */}
        <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '24px', top: '20px', color: '#9ca3af' }} size={24} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, skill, or experience..."
              style={{
                width: '100%',
                padding: '20px 20px 20px 64px',
                fontSize: '18px',
                border: '1px solid #e2e8f0',
                borderRadius: '9999px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Results Count */}
        <p style={{ marginBottom: '24px', color: '#64748b', fontSize: '18px' }}>
          {filteredJobs.length} jobs found
        </p>

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              border: '5px solid #e2e8f0',
              borderTop: '5px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p>Loading opportunities...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#94a3b8', fontSize: '20px' }}>
            No matching jobs found
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '28px'
          }}>
            {filteredJobs.map((job, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '24px',
                padding: '32px',
                border: '1px solid #e2e8f0',
                transition: 'all 0.3s'
              }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 20px 25px -5px rgb(0 0 0 / 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
              >
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
                  {job.profile}
                </h3>

                <p style={{
                  color: '#475569',
                  lineHeight: '1.6',
                  marginBottom: '24px',
                  minHeight: '110px',
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {job.desc}
                </p>

                {job.exp && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', color: '#64748b' }}>
                    <Clock size={20} />
                    <span>{job.exp} years experience</span>
                  </div>
                )}

                {job.techs && job.techs.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '32px' }}>
                    {job.techs.map((tech, i) => (
                      <span key={i} style={{
                        backgroundColor: '#eff6ff',
                        color: '#1e40af',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        fontSize: '14px'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => alert(`Applied for: ${job.profile}`)}
                  style={{
                    width: '100%',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '16px',
                    borderRadius: '9999px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}