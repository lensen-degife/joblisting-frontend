import { useState } from 'react';
import api from '../api/axios';
import { Post } from '../types';
import { useNavigate } from 'react-router-dom';

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
      navigate('/jobs');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to post job');
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

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Post a New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm">
        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input
            type="text"
            required
            value={formData.profile}
            onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            placeholder="e.g. Senior Full Stack Developer"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Job Description</label>
          <textarea
            required
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            rows={6}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
            placeholder="Describe the role, responsibilities, and requirements..."
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-2">Required Experience (years)</label>
          <input
            type="number"
            required
            min="0"
            value={formData.exp}
            onChange={(e) => setFormData({ ...formData, exp: parseInt(e.target.value) || 0 })}
            className="w-full px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-sm font-medium mb-2">Technologies / Skills</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="flex-1 px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500"
              placeholder="e.g. React, Node.js"
            />
            <button
              type="button"
              onClick={addTech}
              className="px-8 bg-gray-800 text-white rounded-2xl hover:bg-gray-900"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {formData.techs.map((tech, i) => (
              <span key={i} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-medium hover:bg-blue-700 disabled:opacity-70 mt-6"
        >
          {loading ? 'Posting Job...' : 'Post Job Now'}
        </button>
      </form>
    </div>
  );
}