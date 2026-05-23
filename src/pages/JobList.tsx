import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Search, Clock, MapPin, Briefcase } from 'lucide-react';
import type { Post } from '../types';

export default function JobList() {
  const [jobs, setJobs] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (query = '') => {
    setLoading(true);
    try {
      // Backend compatible endpoints
      const url = query 
        ? `/posts/search?query=${encodeURIComponent(query)}` 
        : '/allPosts';
      
      const res = await api.get(url);
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      // Fallback: try alternative endpoint if needed
      try {
        const fallback = await api.get('/posts');
        setJobs(Array.isArray(fallback.data) ? fallback.data : []);
      } catch (fallbackErr) {
        console.error("All attempts failed", fallbackErr);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchJobs(searchTerm);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Hero */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-bold mb-6 tracking-tight">
            Find Your Next Opportunity
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Discover thousands of jobs from top companies around the world
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-6 top-5 text-gray-400" size={24} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by job title, company, or skill..."
              className="w-full pl-16 pr-6 py-5 text-lg bg-white border border-gray-200 rounded-3xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-xl"
            />
            <button
              type="submit"
              className="absolute right-3 top-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-3xl font-medium transition"
            >
              Search
            </button>
          </div>
        </form>

        {/* Jobs Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading great opportunities...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No jobs found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job, index) => (
              <div 
                key={index} 
                className="job-card bg-white border border-gray-100 rounded-3xl p-8 hover:border-blue-200 group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1 line-clamp-2">
                      {job.profile || "Software Engineer"}
                    </h3>
                 
                  </div>
                  <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-2xl whitespace-nowrap">
                    NEW
                  </span>
                </div>

                <p className="text-gray-600 line-clamp-3 mb-8 min-h-[72px]">
                  {job.desc || "No description available"}
                </p>

          

                {/* Footer */}
                <div className="pt-6 border-t flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={18} />
                      <span>2d ago</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={18} />
                      <span>Remote</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => alert(`Applying for: ${job.profile}`)}
                    className="text-blue-600 hover:text-blue-700 font-semibold transition flex items-center gap-1 group-hover:gap-2"
                  >
                    Apply Now <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}