import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Find Your Dream Job
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        Discover amazing opportunities from top companies. 
        Post jobs and hire talented professionals.
      </p>
      
      <div className="flex gap-4 justify-center">
        <Link
          to="/jobs"
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-medium hover:bg-blue-700 transition flex items-center gap-2"
        >
          Browse Jobs <ArrowRight />
        </Link>
        <Link
          to="/post-job"
          className="border border-gray-300 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-gray-50 transition"
        >
          Post a Job
        </Link>
      </div>
    </div>
  );
}