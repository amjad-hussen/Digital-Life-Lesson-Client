import React from "react";


const DashboardHome = () => {



  return (
    <div className="px-8 py-6 space-y-10">

      {/* ---------- Top Heading ---------- */}
      <h1 className="text-2xl md:text-4xl font-bold">Dashboard Overview</h1>

      {/* ---------- Stats Cards ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 bg-white shadow rounded-xl border">
          <h2 className="text-gray-500 text-sm">Total Lessons</h2>
          <p className="text-3xl font-bold mt-2">42</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border">
          <h2 className="text-gray-500 text-sm">Saved / Favorites</h2>
          <p className="text-3xl font-bold mt-2">18</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border">
          <h2 className="text-gray-500 text-sm">This Week Contribution</h2>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

      </div>

      {/* ---------- Recent Lessons Section ---------- */}
      <div className="bg-white border shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recently Added Lessons</h2>

        <div className="space-y-3">
          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <h3 className="font-bold">How I overcame procrastination</h3>
            <p className="text-sm text-gray-500">Personal Growth • 2 days ago</p>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <h3 className="font-bold">A mistake that changed my career</h3>
            <p className="text-sm text-gray-500">Career • 4 days ago</p>
          </div>
        </div>
      </div>

      {/* ---------- Quick Shortcuts ---------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="btn h-20 text-lg bg-green-600 text-white rounded-xl">
          ➕ Add New Lesson
        </button>
        <button className="btn h-20 text-lg btn-outline rounded-xl">
          ⭐ View Saved Lessons
        </button>
        <button className="btn h-20 text-lg btn-outline rounded-xl">
          📚 Explore Public Lessons
        </button>
      </div>

      {/* ---------- Analytics Chart ---------- */}
      <div className="bg-white shadow border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Reflections</h2>

        
      </div>

    </div>
  );
};

export default DashboardHome;
