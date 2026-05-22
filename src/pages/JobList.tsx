import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Post } from '../types';
import { Search, Clock } from 'lucide-react';

export default function JobList() {
  const [jobs, setJobs] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJobs = async (query = '') => {
    setLoading(true);
    try {
      const url = query ? `/posts/${query}` : '/allPosts';
      const res = await api.get(url);
      setJobs(res.data);
    } catch (err) {
      console.error(err);
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
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">Available Jobs</h1>
        <p className="text-gray-600">Discover your next opportunity</p>
      </div>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by role, technology, or company..."
            className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-lg"
          />
        </div>
      </form>

      {loading ? (
        <p className="text-center py-20 text-gray-500">Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-3">{job.profile}</h3>
              <p className="text-gray-600 line-clamp-4 mb-5">{job.desc}</p>

              <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                <Clock size={18} />
                <span>{job.exp} years experience required</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {job.techs.map((tech, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 text-sm px-4 py-1.5 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {jobs.length === 0 && !loading && (
        <p className="text-center text-gray-500 text-xl py-20">No jobs found for your search.</p>
      )}
    </div>
  );
}