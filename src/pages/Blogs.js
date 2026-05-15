import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Blogs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">RealEstate Pro</Link>
            <Button asChild variant="outline"><Link to="/">Home</Link></Button>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <p className="mt-4 text-gray-600">Coming soon...</p>
      </div>
    </div>
  );
}
