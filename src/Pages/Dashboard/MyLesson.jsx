import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyLesson = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { refetch, data: lessons = [] } = useQuery({
        queryKey: ['/myLesson', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/lessons?email=${user.email}`)
            return res.data
        }
    })

    const handleToggleVisibility = (lesson) => {
        const newStatus = lesson.privacy === "Public" ? "Private" : "Public"

        Swal.fire({
            title: "Are you sure?",
            text: `Change visibility to ${newStatus}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, change it!",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.patch(`/lessons/${lesson._id}`, {
                    privacy: newStatus
                });

                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        title: "Updated!",
                        text: `Visibility changed to ${newStatus}`,
                        icon: "success"
                    });
                }
            }
        });

    }

    const handleDelete =(id) => {

         Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
    }).then(async (result) => {
        if (result.isConfirmed) {

            const res = await axiosSecure.delete(`/lessons/${id}`);
            
            if (res.data.deletedCount) {
                refetch();

                Swal.fire({
                        title: "Deleted!",
                        text: `Lesson has been deleted.`,
                        icon: "success"
                    });
            } 
        }
    });

    }

    return (
        <div className='px-8 py-6 space-y-10'>
            <h1 className='text-2xl md:text-4xl text-primary font-bold'>My Lessons : {lessons.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Visibility</th>
                            <th>Access Level</th>
                            <th>Stats</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lessons.map((lesson, index) => <tr key={lesson._id} >
                                <th>{index + 1}</th>

                                <td>
                                    <h2 className='font-bold text-xl text-primary'>{lesson.lessonTitle}</h2>
                                    <p className='text-gray-500 text-sm font-semibold'>{lesson.category}</p>
                                </td>

                                <td className="flex items-center gap-2 py-2">
                                    <input onChange={() => handleToggleVisibility(lesson)}  checked={lesson.privacy === "Private"} type="checkbox" className="toggle toggle-success" />
                                    <span className="text-sm">
                                        Public / Private
                                    </span>
                                </td>
                                <td>
                                    <select defaultValue="Select Access Level " className="select w-full">
                                        <option disabled={true}>Access Level </option>
                                        <option>Free</option>
                                        <option>Premium</option>

                                    </select>
                                </td>
                                <td className=''>
                                    <div>
                                        <span className='mr-3'>❤️ 20k</span>
                                        <span>⭐ 10k</span>
                                    </div>
                                    <span> 12 jan 2025</span>

                                </td>
                                <td className='flex gap-2'>
                                    <button className='btn'> <FaEdit /> </button>
                                    <button onClick={() => handleDelete(lesson._id)} className='btn'><RiDeleteBin6Line /></button>
                                    <button className='btn bg-green-700 hover:bg-green-800 text-white font-bold'> Details </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyLesson;