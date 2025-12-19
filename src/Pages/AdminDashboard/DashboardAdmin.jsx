import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Component/SharedElement/Loading";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";

const DashboardAdmin = () => {
    const axiosSecure = useAxiosSecure();

    const { data = {}, isLoading } = useQuery({
        queryKey: ["admin-overview"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/overview");
            return res.data;
        },
    });



    if (isLoading) return <Loading />;

    const { totalUsers, totalLessons, totalReports, todaysLessons, topContributors, weeklyLessonGrowth = [], weeklyUserGrowth = [] } = data;



    const combinedData = weeklyLessonGrowth.map((item, index) => ({
        date: item.date,
        lessons: item.count,
        users: weeklyUserGrowth[index]?.count || 0
    }));



    return (
        <div className="px-8 py-6 space-y-10">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Stat title="Total Users" value={totalUsers} />
                <Stat title="Public Lessons" value={totalLessons} />
                <Stat title="Reports" value={totalReports} />
                <Stat title="Today's Lessons" value={todaysLessons} />
            </div>

            {/* Top Contributors */}
            <div className="bg-white shadow border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Most Active Contributors
                </h2>

                <ul className="space-y-2">
                    {topContributors?.map((user, index) => (
                        <li
                            key={index}
                            className="flex justify-between border-b pb-2"
                        >
                            <span>{user.authorName || user._id}</span>
                            <span className="font-bold">{user.count} lessons</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Graph placeholder */}
            <div className="bg-white shadow border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">
                    Platform Growth (Weekly)
                </h2>
                <div>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={combinedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="lessons" stroke="#22c55e" strokeWidth={2} />
                            <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;

const Stat = ({ title, value }) => (
    <div className="p-6 bg-white shadow rounded-xl border">
        <h2 className="text-gray-500 text-sm">{title}</h2>
        <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
);
