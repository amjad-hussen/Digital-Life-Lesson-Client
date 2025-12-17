import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Component/SharedElement/Loading';
import Swal from 'sweetalert2';


const ManageUsers = () => {
    
    const axiosSecure = useAxiosSecure()

    const { refetch, data: users, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const UserLessonCount = ({ email }) => {
        const { data, isLoading: lessonLoading } = useQuery({
            queryKey: ['lesson-count', email],
            queryFn: async () => {
                const res = await axiosSecure.get(`/lessons/count/${email}`);
                return res.data.count;
            }

        });
        if (lessonLoading) {
            return <Loading></Loading>
        }

        return <span>{data}</span>
    }


    const handleMakeAdmin = (user) => {
        const roleInfo = { role: 'admin' }

        Swal.fire({
            title: "Are you sure?",
            text: `You want to Make Admin  ${user.displayName}  !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Continue!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                title: `${user.displayName} marked as an Admin`,
                                text: "Successfully Make Admin",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleRemoveAdmin = (user) => {
        const roleInfo = { role: 'user' }

        Swal.fire({
            title: "Are you sure?",
            text: `You want to remove ${user.displayName} from Admin !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Continue!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            refetch()
                            Swal.fire({
                                title: `${user.displayName} removed from Admin`,
                                text: "Successfully Removed from Admin",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='text-center'>
                <h1 className=" text-2xl md:text-4xl font-bold text-primary">Manage Users : {users.length}</h1>
                <p className="text-gray-500 text-lg mt-2 border-b border-gray-200 pb-5">
                    View all registered users, manage roles, and monitor their activity in one place.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Lesson Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={user._id}>
                                        <th> {index + 1}</th>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td> <UserLessonCount email={user.email} /></td>
                                        <td>
                                            {
                                                user.role === 'admin' ?
                                                    <button onClick={() => handleRemoveAdmin(user)} className='btn bg-red-500 text-white font-bold '> Remove Admin</button> :
                                                    <button onClick={() => handleMakeAdmin(user)} className='btn bg-green-700 text-white font-bold '> Make Admin</button>
                                            }

                                        </td>
                                    </tr>)

                            })
                        }



                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default ManageUsers;