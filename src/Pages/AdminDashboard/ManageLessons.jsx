import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Component/SharedElement/Loading';
import Swal from 'sweetalert2';

const ManageLessons = () => {

    const axiosSecure = useAxiosSecure()

    const [categoryFilter, setCategoryFilter] = useState("All");


    const { data: lessons = [], isLoading, refetch } = useQuery({
        queryKey: ['admin-lessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons');
            return res.data;
        }
    });

    const filteredLessons = lessons.filter(lesson =>
        categoryFilter === "All" || lesson.category === categoryFilter
    );




    const handleDeleteLesson = (lesson) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You want to remove "${lesson.lessonTitle}"`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/lessons/${lesson._id}`)
                    .then(res => {

                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                "Deleted!",
                                "Lesson has been removed.",
                                "success"
                            );

                        }
                    });
            }
        });
    };


    const handleToggleFeatured = (lesson) => {
        const updatedValue = !lesson.isFeatured;
        axiosSecure.patch(`/lessons/${lesson._id}/featured`, { isFeatured: updatedValue })
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch()
                    Swal.fire(
                        updatedValue ? "Marked as Featured!" : "Removed from Featured!",
                        `"${lesson.lessonTitle}" has been updated.`,
                        "success"
                    );
                }
            });
    };

    const handleToggleReviewed = (lesson) => {
        const updatedValue = !lesson.isReviewed;

        axiosSecure.patch(`/lessons/${lesson._id}/reviewed`, {
            isReviewed: updatedValue
        })
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire(
                        updatedValue ? "Marked as Reviewed!" : "Review Removed!",
                        `"${lesson.lessonTitle}" review status updated.`,
                        "success"
                    );
                }
            });
    }



    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='text-center'>
                <h1 className=" text-2xl md:text-4xl font-bold text-primary">Lesson Management</h1>
                <p className="text-gray-500 text-lg mt-2 border-b border-gray-200 pb-5">
                    Monitor all user-generated lessons, control visibility, and ensure content meets platform standards.
                </p>
            </div>

            <div className="flex justify-end mt-5">
                <select
                    className="select select-bordered w-64"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Personal Growth">Personal Growth</option>
                    <option value="Career">Career</option>
                    <option value="Relationships">Relationships</option>
                    <option value="Mindset">Mindset</option>
                    <option value="Mistakes Learned">Mistakes Learned</option>
                </select>
            </div>




            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Lesson Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLessons.map((lesson, index) => (
                            <tr key={lesson._id}>
                                <td>{index + 1}</td>
                                <td>{lesson.lessonTitle}</td>
                                <td>{lesson.category}</td>
                                <td>{lesson.email}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <button onClick={() => handleDeleteLesson(lesson)} className='btn bg-red-500 text-white font-bold'>Remove</button>

                                        <button onClick={() => handleToggleFeatured(lesson)} className={`btn ${lesson.isFeatured ? 'bg-blue-700' : 'bg-green-700'} text-white font-bold`} >
                                            {lesson.isFeatured ? 'Featured ' : 'Mark as Featured'}
                                        </button>

                                        <button onClick={() => handleToggleReviewed(lesson)} className={`btn ${lesson.isReviewed ? 'bg-gray-600' : 'bg-yellow-500'
                                            } text-white font-bold`}>
                                            {lesson.isReviewed ? 'Reviewed ' : 'Mark as Reviewed'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageLessons;