import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const MostSavedLesson = () => {
    const axiosSecure = useAxiosSecure()

    const [lessons, setLessons] = useState([]);

    useEffect(() => {
        axiosSecure.get('http://localhost:3000/lessons/most-saved')
            .then(res => setLessons(res.data))
            .catch(err => console.log(err));
    }, [axiosSecure])
    return (
        <div className='px-10'>
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-4xl text-primary font-bold text-center mb-12">
                        Most Saved Lessons
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lessons.map(lesson => (
                            <div
                                key={lesson._id}
                                className="bg-white rounded-xl shadow-md p-6"
                            >
                                <h3 className="text-xl font-semibold mb-2">
                                    {lesson.lessonTitle}
                                </h3>

                                <p className="text-gray-600 mb-3">
                                    {lesson.description}
                                </p>

                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Saved: {lesson.savesCount}</span>
                                    <span>{lesson.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MostSavedLesson;