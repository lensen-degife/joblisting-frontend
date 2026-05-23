import { useState } from 'react';
import api from '../api/axios';
import type { Post } from '../types';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, X } from 'lucide-react';

export default function PostJob() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Post>({
    profile: '',
    desc: '',
    exp: 0,
    techs: [],
  });

  const [techInput, setTechInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/post', formData);
      alert('✅ Job posted successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addTech = () => {
    if (techInput.trim()) {
      setFormData({ ...formData, techs: [...formData.techs, techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    setFormData({
      ...formData,
      techs: formData.techs.filter((_, i) => i !== index)
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      paddingTop: '40px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '700px', 
        margin: '0 auto', 
        padding: '0 20px' 
      }}>
        
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '50px 40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0'
        }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              color: 'white',
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <PlusCircle size={32} />
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#1e2937' }}>
              Post a New Job
            </h1>
            <p style={{ color: '#64748b', marginTop: '8px' }}>
              Fill in the details to publish your job opening
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Job Title */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#334155' }}>
                Job Title
              </label>
              <input
                type="text"
                required
                value={formData.profile}
                onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                placeholder="e.g. Senior Full Stack Developer"
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '17px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Experience */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#334155' }}>
                Required Experience (in years)
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.exp}
                onChange={(e) => setFormData({ ...formData, exp: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '17px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  outline: 'none'
                }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#334155' }}>
                Job Description
              </label>
              <textarea
                required
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                placeholder="Describe the role, responsibilities, and what you're looking for..."
                rows={6}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  fontSize: '17px',
                  border: '1px solid #cbd5e1',
                  borderRadius: '12px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Technologies */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#334155' }}>
                Required Skills / Technologies
              </label>
              
              <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  placeholder="e.g. React, Node.js, MongoDB"
                  style={{
                    flex: 1,
                    padding: '16px 20px',
                    fontSize: '17px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '12px',
                    outline: 'none'
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTech();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addTech}
                  style={{
                    padding: '0 28px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Add
                </button>
              </div>

              {/* Selected Techs */}
              {formData.techs.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {formData.techs.map((tech, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: '#eff6ff',
                        color: '#1e40af',
                        padding: '8px 16px',
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '15px'
                      }}
                    >
                      {tech}
                      <X
                        size={16}
                        style={{ cursor: 'pointer' }}
                        onClick={() => removeTech(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                backgroundColor: loading ? '#94a3b8' : '#2563eb',
                color: 'white',
                padding: '18px',
                fontSize: '18px',
                fontWeight: '600',
                border: 'none',
                borderRadius: '9999px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '20px'
              }}
            >
              {loading ? 'Posting Job...' : 'Post Job Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}