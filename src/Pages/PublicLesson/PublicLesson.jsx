import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import Loading from '../../Component/SharedElement/Loading';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import userimg from '../../assets/life-lesson.jpeg'
import { Link } from 'react-router';

const PublicLesson = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [dbUser, setDbUser] = useState(null)


    useEffect(() => {
        if (!user?.email) return;

        let isMounted = true;

        axiosSecure.get(`/users?email=${user.email}`)
            .then(res => {
                if (isMounted) {
                    setDbUser(res.data || {})
                }
            });

        return () => {
            isMounted = false;
        };
    }, [user?.email, axiosSecure]);




    const { data: lessons = [], isLoading } = useQuery({
        queryKey: ['/lessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons')
            return res.data
        }

    })
    const isUserPremium = user && dbUser?.isPremium === true;


    if (loading || isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='bg-white p-10 my-5 rounded-xl'>
            <div className='text-center '>
                <h1 className='text-2xl md:text-4xl font-bold text-primary'>Public Life Lesson</h1>
                <p className='mt-2'>Discover wisdom shared openly by people from all walks of life</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10'>

                {
                    lessons.map(lesson => {
                        const isPremiumLesson = lesson.accessLevel === 'premium';
                        const locked = isPremiumLesson && !isUserPremium;
                        return (
                            <div key={lesson._id} className='bg-gray-100 shadow-xl rounded-md p-5 flex flex-col h-full relative '>

                                <div className={`flex flex-col h-full ${locked ? 'blur-sm' : ''}`}>

                                    <img className='mx-auto rounded-full overflow-hidden border-2 border-primary p-1 w-20 h-20' src={lesson.photoURL || userimg} alt="user Photo" />
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

                                <Link to={`/lessons/${lesson._id}`} disabled={locked} className="btn bg-green-700 w-full hover:bg-green-800 text-white font-bold mt-auto">See Details</Link>


                                {locked && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm rounded-md">
                                        <span className="text-4xl">🔒</span>
                                        <p className="font-bold text-center mt-2">
                                            Premium Lesson – Upgrade to view
                                        </p>
                                    </div>
                                )}
                            </div>)
                    })

                }


            </div>
        </div>
    );
};

export default PublicLesson;