import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Component/SharedElement/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const DashboardHome = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()


  const { data: myLessons = [], isLoading } = useQuery({
    queryKey: ["myLessons", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user.email}`);
      return res.data;
    },
  });


  const { data: favoriteLessons = [], isLoading: favLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(`/favorite?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });


  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split("T")[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();

  const weeklyData = last7Days.map((date) => {
    const count = myLessons.filter(
      (lesson) =>
        new Date(lesson.createdAt).toISOString().split("T")[0] === date
    ).length;

    return {
      date: date.slice(5),
      lessons: count,
    };
  });




  if (isLoading || loading || favLoading) {
    return <Loading></Loading>
  }


  const recentLessons = myLessons
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);



  return (
    <div className="px-8 py-6 space-y-10">


      <h1 className="text-2xl md:text-4xl font-bold">Dashboard Overview</h1>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-white shadow rounded-xl border">
          <h2 className="text-gray-500 text-sm">Total Lessons</h2>
          <p className="text-3xl font-bold mt-2">{myLessons.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl border">
          <h2 className="text-gray-500 text-sm"> Favorites</h2>
          <p className="text-3xl font-bold mt-2">{favoriteLessons.length}</p>
        </div>


      </div>


      <div className="bg-white border shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recently Added Lessons</h2>

        <div className="space-y-3">

          {
            recentLessons.map(lesson => (
              <div key={lesson._id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <h3 className="font-bold">{lesson.lessonTitle}</h3>
                <p className="text-sm text-gray-500">{lesson.category} •  {new Date(lesson.createdAt).toLocaleDateString()}</p>
              </div>
            ))
          }

        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to={'/dashboard/add-lesson'} className="btn h-20 text-lg bg-green-600 text-white rounded-xl">
          Add New Lesson
        </Link>
        <Link to={'/dashboard/my-favorites'} className="btn h-20 text-lg btn-outline rounded-xl">
          View Favorite Lessons
        </Link>
        <Link to={'/public-lesson'} className="btn h-20 text-lg btn-outline rounded-xl">
          Explore Public Lessons
        </Link>
      </div>

      {/* ---------- Analytics Chart ---------- */}
      <div className="bg-white shadow border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Weekly Reflections / Contributions
        </h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="lessons"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>


    </div>
  );
};

export default DashboardHome;
