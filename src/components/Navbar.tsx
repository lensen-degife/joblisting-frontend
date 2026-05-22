import { Briefcase, Plus, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">JobListing</h1>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
            <Home size={20} /> Home
          </Link>
          <Link to="/jobs" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
            <Briefcase size={20} /> Browse Jobs
          </Link>
          <Link
            to="/post-job"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Plus size={20} /> Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
}