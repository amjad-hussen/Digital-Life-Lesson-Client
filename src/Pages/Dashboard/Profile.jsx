import React, { useRef } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import banner from '../../assets/download.jpeg'
import Loading from '../../Component/SharedElement/Loading';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const updateRef = useRef()

    const { register, handleSubmit} = useForm()

    const { data: dbUser, isLoading, refetch,  } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`)
            return res.data
        }
    })

    const { data: myLessons = [], isLoading: isLessonsLoading } = useQuery({
        queryKey: ['myLessons', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/lessons?email=${user.email}`)
            return res.data
        }
    });

    const { data: mySavedLessons = [], isLoading: isSavedLoading } = useQuery({
        queryKey: ['mySavedLessons', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorite?email=${user.email}`);
            return res.data;
        }
    });

    const handleOpenModal = () => {
        updateRef.current.showModal()
    }

    const handleUpdate = async (data) => {
        const updatedData = {
            displayName: data.name,
        }
        const res = await axiosSecure.patch(`/users/${user.email}`, updatedData)
        console.log(res.data)
        updateRef.current.close()
        if (res.data?.result?.modifiedCount > 0) {
            refetch()
            Swal.fire({
                title: "Updated !",
                text: "Your Profile Updated Successfully.",
                icon: "success"
            });
        }
    }


    if (isLoading || isLessonsLoading || isSavedLoading) {
        return <Loading></Loading>
    }

    const sortedLessons = [...myLessons].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    const dbUserData = dbUser || {};
    const { displayName, isPremium, email, photoURL, role } = dbUserData

    return (
        <div className='bg-white p-10 my-5 rounded-xl'>
            <div className='border border-gray-200 rounded-xl max-w-md mx-auto '>
                <img className='w-full h-35' src={banner} alt="banner" />

                <img className='mx-auto rounded-full overflow-hidden h-25 w-25 border-3 border-primary p-1' src={photoURL} alt=" profile" />



                <div className='flex gap-3 justify-center'>
                    <p className='btn-sm rounded-full bg-green-700 text-sm text-white font-semibold py-1 px-3 mt-2'> {role}</p>
                    {isPremium === true ? <button className='btn-sm rounded-full bg-green-700 text-sm text-white font-semibold py-1 px-3 mt-2'> Premium </button>
                        :
                        <button className='btn-sm rounded-full bg-green-700 text-sm text-white font-semibold py-1 px-3 mt-2'> Free </button>}
                </div>
                <h1 className='text-primary font-bold text-2xl md:text-4xl text-center mt-1'>{displayName}</h1>
                <p className='text-sm font-semibold text-primary text-center mt-1'>{email}</p>
                <div className='px-10 flex gap-3 justify-between items-center my-4'>
                    <div className='text-primary font-semibold'>
                        <p>My Created Lesson : {myLessons.length} </p>
                        <p>My Saved Lesson: {mySavedLessons.length} </p>
                    </div>
                    <button onClick={handleOpenModal} className='btn bg-green-700 font-bold text-white'>Update Profile</button>
                </div>
            </div>

            <div>
                <h1 className='text-primary font-bold text-2xl md:text-4xl  mt-8'>My Created Lesson</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                    {
                        sortedLessons.map(lesson => <div key={lesson._id} className='bg-gray-100 shadow-xl rounded-md p-5 flex flex-col h-full relative '>

                            <div>

                                <img className='mx-auto rounded-full overflow-hidden border-2 border-primary p-1 w-20 h-20' src={lesson.photoURL} alt="user Photo" />
                                <h1 className='text-center font-bold text-xl  md:text-2xl text-primary mt-1'>{lesson.userName}</h1>

                                <div className='flex justify-center mt-1 border-b border-gray-200 pb-5'><button className='btn-sm rounded-full bg-green-700 text-white font-semibold py-1 px-4 text-sm mx-auto'>{lesson.accessLevel}</button></div>

                                <h1 className='font-bold text-xl md:text-2xl text-primary mt-2'>{lesson.lessonTitle}</h1>
                                <p className='mt-1 '>{lesson.description}</p>

                                <div className='flex justify-between mt-3'>
                                    <p><span className='font-bold'>Category:</span> {lesson.category}</p>
                                    <p><span className='font-bold'>Tone:</span> {lesson.emotionalTone}</p>
                                </div>

                                <p className='mt-2 mb-5'><span className='font-bold'>Cteated At:</span> {lesson.createdAt}</p>

                            </div>

                            <Link to={`/lessons/${lesson._id}`} className="btn bg-green-700 w-full hover:bg-green-800 text-white font-bold mt-auto">See Details</Link>

                        </div>)
                    }
                </div>
            </div>

            {/* Update Profile Modal  */}
            {/* Open the modal using document.getElementById('ID').showModal() method */}

            <dialog ref={updateRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl md:text-4xl text-primary text-center">Update Profile</h3>
                    <form onSubmit={handleSubmit(handleUpdate)} >
                        <fieldset className="fieldset px-10">
                            {/* Email Field */}

                            <label className="label text-black font-bold">Email</label>
                            <input type="email" {...register('email',)} defaultValue={email} readOnly className="input focus:border-0 w-full" placeholder="Email" />

                            {/* Your Name Field */}
                            <label className="label text-black font-bold ">Your Name</label>
                            <input type="text" {...register('name', { required: true })} defaultValue={displayName} className="input focus:border-0 w-full" placeholder="Your Name" />


                            <button className="btn bg-green-700 text-white font-bold mt-4">Update Now</button>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>


                        </fieldset>

                    </form>

                </div>
            </dialog>
        </div>
    );
};

export default Profile;