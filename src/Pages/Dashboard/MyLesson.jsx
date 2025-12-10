import React, { useRef } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const MyLesson = () => {

    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const updateRef = useRef()
    const { register, handleSubmit, reset } = useForm()

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

    const handleDelete = (id) => {

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

    const handleOpenModal = (lesson) => {
        updateRef.current.showModal()
        reset(lesson)
    }

    const handleUpdate = async (data) => {

        const updateData = {
            lessonTitle: data.lessonTitle,
            userName: data.userName,
            email: data.email,
            accessLevel: data.accessLevel,
            description: data.description
        };

        const res = await axiosSecure.patch(`/lessons/${data._id}`, updateData)
        if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
                title: "Updated!",
                text: `Lesson updated successfully`,
                icon: "success"
            });

            updateRef.current.close();
        }

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
                                    <input onChange={() => handleToggleVisibility(lesson)} checked={lesson.privacy === "Private"} type="checkbox" className="toggle toggle-success" />
                                    <span className="text-sm">
                                        Public / Private
                                    </span>
                                </td>
                                <td>
                                    {lesson.accessLevel === "Free" ? "Free" : "Premium"}
                                </td>

                                <td className=''>
                                    <div>
                                        <span className='mr-3'>❤️ 20k</span>
                                        <span>⭐ 10k</span>
                                    </div>
                                    <span> 12 jan 2025</span>

                                </td>
                                <td className='flex gap-2'>
                                    <button onClick={() => handleOpenModal(lesson)} className='btn'> <FaEdit /> </button>
                                    <button onClick={() => handleDelete(lesson._id)} className='btn'><RiDeleteBin6Line /></button>
                                    <button className='btn bg-green-700 hover:bg-green-800 text-white font-bold'> Details </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>


            {/* Modal for Update  */}


            <dialog ref={updateRef} id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h1 className='text-2xl md:text-4xl text-center font-bold text-primary mb-3'>Update Lesson</h1>
                    <p className='text-center text-sm text-gray-500 mt-2 border-b border-gray-200 pb-5'>Make changes to your lesson and save the updated version instantly.</p>


                    <form onSubmit={handleSubmit(handleUpdate)} >

                        {/* Lesson Title */}
                        <label className="label font-bold text-black mt-5">Lesson Title</label>
                        <input type="text" {...register('lessonTitle')} className="input focus:border-0 w-full mt-1" placeholder="Lesson Tittle" />


                        {/* Your Name */}
                        <label className="label font-bold text-black mt-3">Your Name</label>
                        <input type="text" {...register('name')} defaultValue={user.displayName} className="input focus:border-0 w-full mt-1" placeholder="Your Name" />


                        {/* User Email */}
                        <label className="label font-bold text-black mt-3">Your Email</label>
                        <input type="email" {...register('email')} defaultValue={user.email} className="input focus:border-0 w-full mt-1" placeholder="Your Email" />

                        {/*Access Level  Field  */}
                        <label className="label font-bold text-black mt-3">Access Level </label>
                        <select defaultValue="Select Access Level " {...register('accessLevel')} className="select w-full mt-1">
                            <option disabled={true}>Access Level </option>
                            <option>Free</option>
                            <option>Premium </option>

                        </select>


                        {/* Lesson Description  */}
                        <label className="label font-bold text-black  mt-3">Lesson Description</label>
                        <textarea className="textarea w-full focus:border-0 mt-1" {...register('description')} placeholder="Lesson Description "></textarea>

                        <button className="btn w-1/2 bg-green-700 hover:bg-green-800 text-white font-bold mt-4">Add Lesson</button>


                        <button type="button" className="btn mt-4 w-1/2 border-2 border-primary text-bold text-primary" onClick={() => updateRef.current.close()}>Close</button>

                    </form>
                </div>

            </dialog >
        </div >
    );
};

export default MyLesson;