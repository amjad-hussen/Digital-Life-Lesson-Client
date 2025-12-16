import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import banner from '../../assets/download.jpeg'
import Loading from '../../Component/SharedElement/Loading';
import { Link } from 'react-router';

const Profile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: dbUser, isLoading } = useQuery({
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
    console.log(mySavedLessons)


    if (isLoading || isLessonsLoading || isSavedLoading) {
        return <Loading></Loading>
    }

    const sortedLessons = [...myLessons].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const { displayName, isPremium, email, photoURL, role } = dbUser
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
                <h1 className='text-primary font-bold text-2xl md:text-4xl text-center'>{displayName}</h1>
                <p className='text-sm font-semibold text-primary text-center mt-1'>{email}</p>
                <div className='px-10 flex gap-3 justify-between items-center my-4'>
                    <div className='text-primary font-semibold'>
                        <p>My Created Lesson : {myLessons.length} </p>
                        <p>My Saved Lesson: {mySavedLessons.length} </p>
                    </div>
                    <button className='btn bg-green-700 font-bold text-white'>Update Profile</button>
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
        </div>
    );
};

export default Profile;