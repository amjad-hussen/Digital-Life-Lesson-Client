import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const TopContributors = () => {
    const axiosSecure = useAxiosSecure()

    const [contributors, setContributors] = useState([]);

    useEffect(() => {
        const fetchTopContributors = async () => {
            try {
                const res = await axiosSecure.get('/lessons/top-contributors');
                setContributors(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTopContributors();
    }, [axiosSecure]);
    console.log('contributors ', contributors)

    return (
        <div className='px-10'>
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl text-primary font-bold text-center mb-12">Top Contributors of the Week</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contributors.map((c, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                                <h3 className="text-xl font-semibold mb-2">{c.authorName}</h3>
                                <p className="text-gray-600">Lessons: {c.count}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TopContributors;