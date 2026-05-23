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
        ? `/posts/${encodeURIComponent(query)}`
        : '/allPosts';
      
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

  // Real-time filtering using only backend fields
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Next Job</h1>
          <p className="text-blue-100 text-xl">Search through available positions</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8 pb-12">
        {/* Search Bar */}
        <form className="mb-10">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-6 top-5 text-gray-400" size={24} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by role, skill, or experience..."
              className="w-full pl-16 pr-6 py-5 text-lg bg-white border border-gray-200 rounded-3xl focus:outline-none focus:border-blue-500 shadow-xl"
            />
          </div>
        </form>

        {/* Results Info */}
        <div className="flex justify-between mb-8 text-gray-600">
          <p>{filteredJobs.length} jobs found</p>
        </div>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading opportunities...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No matching jobs found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {job.profile}
                </h3>

                <p className="text-gray-600 line-clamp-4 mb-6 min-h-[100px]">
                  {job.desc}
                </p>

                {/* Experience */}
                {job.exp && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Clock size={18} />
                    <span>{job.exp} years experience</span>
                  </div>
                )}

                {/* Tech Stack */}
                {job.techs && job.techs.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.techs.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-4 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-2xl font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <button 
                  onClick={() => alert(`Applied for: ${job.profile}`)}
                  className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-medium transition"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}