import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Component/SharedElement/Loading';
import { Link } from 'react-router';



const Favorites = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: favorites = [], isLoading, refetch } = useQuery({
        queryKey: ['myFavorites', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorite?email=${user.email}`);
            return res.data;
        }
    });


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary">My Favorites</h1>
            <p className="text-gray-500 text-lg mt-2 border-b border-gray-200 pb-5">
                Here are all the lessons you have saved. You can view details or remove them from your favorites.
            </p>

            <div className="overflow-x-auto mt-5">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Emotional Tone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            favorites.map((favorite, index) => {
                                return (
                                    <tr key={favorite._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <h1 className='text-primary font-bold text-sm md:text-xl'>{favorite.lessonTitle}</h1>
                                        </td>
                                        <td>{favorite.category}</td>
                                        <td>{favorite.emotionalTone}</td>
                                        <td>
                                            <div className='flex gap-2'>
                                                <button className='btn bg-red-500  text-white font-bold'>Remove </button>
                                                <Link className='btn bg-green-700 font-bold text-white font-old'>Details</Link>
                                            </div>
                                        </td>
                                    </tr>
                                )

                            })
                        }



                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Favorites;

