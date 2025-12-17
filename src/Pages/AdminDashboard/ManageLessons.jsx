import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Component/SharedElement/Loading';
import Swal from 'sweetalert2';

const ManageLessons = () => {

    const axiosSecure = useAxiosSecure()


    const { data: lessons = [], isLoading, refetch } = useQuery({
        queryKey: ['admin-lessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons');
            return res.data;
        }
    });

   


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




            <div className="overflow-x-auto mt-5">
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
                        {lessons.map((lesson, index) => (
                            <tr key={lesson._id}>
                                <td>{index + 1}</td>
                                <td>{lesson.lessonTitle}</td>
                                <td>{lesson.category}</td>
                                <td>{lesson.email}</td>
                                <td>
                                    <div className='flex gap-2'>
                                        <button onClick={() => handleDeleteLesson(lesson)} className='btn bg-red-500 text-white font-bold'>Remove</button>
                                        <button className='btn bg-green-700 text-white font-bold'>Featured</button>
                                        <button className='btn bg-yellow-500 text-white font-bold'>Reviewed</button>
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