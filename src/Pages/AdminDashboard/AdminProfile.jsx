import React, { useRef } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Component/SharedElement/Loading';
import { useQuery } from '@tanstack/react-query';
import banner from '../../assets/download.jpeg'
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const AdminProfile = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const updateRef = useRef()

    const { register, handleSubmit } = useForm()

    const { data: adminData = {}, isLoading, refetch } = useQuery({
        queryKey: ['adminProfile', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`);
            return res.data; // single object return করবে
        },
    });


    const safeAdminData = adminData || {
    displayName: 'Unknown',
    email: '',
    photoURL: 'https://via.placeholder.com/150',
    role: 'user',
    isPremium: false
};

    

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


    if (isLoading || loading) {
        return <Loading></Loading>
    }

    return (
        <div className='bg-white p-10 my-5 rounded-xl'>
            <div className='border border-gray-200 rounded-xl max-w-md mx-auto '>
                <img className='w-full h-35' src={banner} alt="banner" />

                <img className='mx-auto rounded-full overflow-hidden h-25 w-25 border-3 border-primary p-1' src={safeAdminData.photoURL} alt=" profile" />



                <div className='flex gap-3 justify-center'>
                    <p className='btn-sm rounded-full bg-green-700 text-sm text-white font-semibold py-1 px-3 mt-2'> {safeAdminData.role}</p>

                </div>
                <h1 className='text-primary font-bold text-2xl md:text-4xl text-center mt-1'>{safeAdminData.displayName}</h1>
                <p className='text-sm font-semibold text-primary text-center mt-1'>{safeAdminData.email}</p>
                <div className='px-10 flex gap-3 justify-between items-center my-4'>

                    <div className='mx-auto '>
                        <button onClick={handleOpenModal} className='btn bg-green-700 font-bold text-white'>Update Profile</button>
                    </div>
                </div>
            </div>


            {/* Update Modal  */}

            <dialog ref={updateRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-2xl md:text-4xl text-primary text-center">Update Profile</h3>
                    <form onSubmit={handleSubmit(handleUpdate)} >
                        <fieldset className="fieldset px-10">
                            {/* Email Field */}

                            <label className="label text-black font-bold">Email</label>
                            <input type="email" {...register('email',)} defaultValue={adminData.email} readOnly className="input focus:border-0 w-full" placeholder="Email" />

                            {/* Your Name Field */}
                            <label className="label text-black font-bold ">Your Name</label>
                            <input type="text" {...register('name', { required: true })} defaultValue={adminData.displayName} className="input focus:border-0 w-full" placeholder="Your Name" />


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

export default AdminProfile;