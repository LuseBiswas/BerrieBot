export default function UserPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">User Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Profile</h2>
            <p className="text-gray-300">Manage your profile settings and preferences.</p>
          </div>
          
          {/* Interviews Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Interviews</h2>
            <p className="text-gray-300">View and manage your scheduled interviews.</p>
          </div>
          
          {/* Analytics Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            <p className="text-gray-300">Track your recruitment performance and metrics.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 