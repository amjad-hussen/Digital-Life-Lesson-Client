import { useQueryClient, useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../Component/SharedElement/Loading';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';

const LessonDetails = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()
    const reportRef = useRef()
    const { user } = useAuth()
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset } = useForm()


    const { data: lesson = {}, isLoading, refetch } = useQuery({
        queryKey: ['lesson', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/lessons/${id}`)
            return res.data
        }
    })


    const { data: authorLessons = [] } = useQuery({
        queryKey: ['authorLessons', lesson.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/lessons?email=${email}`)
            return res.data
        }
    })

    const { accessLevel, category, _id, createdAt, description, email, emotionalTone, lessonTitle, photoURL, privacy, reactionsCount, savesCount, updatedAt, userName } = lesson

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleLike = async () => {
        if (!user) {
            Swal.fire('Please log in to like');
            return;
        }

        const res = await axiosSecure.patch(`/lessons/${id}/like`);
        if (res.data.success) {

            queryClient.setQueryData(['lesson', id], old => {
                if (!old) return old;

                return {
                    ...old,
                    likes: res.data.likes,
                    reactionsCount: res.data.reactionsCount
                };
            });
        }

    };

    const likedByUser = user && lesson.likes?.includes(user.email);


    const handleFavorite = async () => {
        if (!user) {
            Swal.fire('Please log in to save');
            return;
        }

        const res = await axiosSecure.patch(`/lessons/${id}/favorite`);

        if (res.data.success) {
            refetch();
        }
    };

    const savedByUser = user && lesson.saves?.includes(user.email);

    const handleReportModal = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to report this lesson!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Continue!"
        }).then((result) => {
            if (result.isConfirmed) {
                reportRef.current.showModal()
            }
        });

    }

    const handleSubmitReport = async (data) => {
        console.log('after submit  report', data)

        const reportInfo = {
            lessonId: data.lessonId,
            reportedEmail: data.reportedEmail,
            reason: data.reason,
            timestamp: new Date()
        }
        const res = await axiosSecure.post('/report', reportInfo)
        console.log(res.data)
        if (res.data.insertedId) {
            reportRef.current.close()


            Swal.fire({
                title: "Submitted!",
                text: "Your report has been submitted.",
                icon: "success"
            });
            reset()
        }
    }


    return (
        <div className='bg-white p-10 my-5 rounded-xl'>
            <div className='flex gap-10 '>
                <div className=' py-10 px-20 border border-gray-200 rounded-md'>
                    <img className='w-30 h-30 mx-auto rounded-full overflow-hidden border-3 border-primary p-1' src={photoURL} alt="" />
                    <h1 className='text-2xl md:text-4xl text-primary text-center font-bold'>{userName}</h1>
                    <div className='flex justify-center mt-2 gap-2'>
                        <button className='btn-sm rounded-full bg-green-700 text-white font-semibold py-1 px-4 text-sm mx-auto'>{accessLevel}

                        </button>
                        <button className='btn-sm rounded-full hover:bg-green-700 hover:text-white font-semibold py-1 px-4 text-sm border-2 border-primary mx-auto cursor-pointer'>View All

                        </button>
                    </div>
                    <p className='text-center font-semibold mt-3'>Total Lesson Created: {authorLessons.length} </p>

                </div>

                <div className=' flex-1'>
                    <h1 className='text-2xl md:text-4xl text-primary font-bold'>{lessonTitle}</h1>

                    <div className='flex gap-15 mt-1 text-gray-500 font-bold border-b border-gray-200 pb-5'>
                        <p>Category: {category}</p>
                        <p>Tone: {emotionalTone}</p>
                    </div>
                    <p className='mt-3'><span className='font-bold ' >Description:</span> {description}</p>

                    <div className='mt-5 flex gap-2'>
                        <div className=' p-5'>
                            <h1 className='text-xl md:text-2xl font-bold text-primary text-center'>Meta Data</h1>
                            <p className='mt-2'> <span className='font-bold text-primary'>Created</span> : {createdAt}</p>
                            <p> <span className='font-bold text-primary'>Updated</span> : {updatedAt}</p>
                            <p> <span className='font-bold text-primary'>Visibility</span> : {privacy}</p>
                        </div>
                        <div className=' p-5'>
                            <h1 className='text-xl md:text-2xl font-bold text-primary text-center'>Engagement </h1>

                            <p className='mt-3'>❤️ <span className='font-bold'>{reactionsCount} Likes </span></p>

                            <p className='mt-1'>🔖  <span className='font-bold'>{savesCount} favorites</span></p>

                            <div className='flex gap-3 mt-3'>
                                <button
                                    onClick={handleLike}
                                    className={`btn ${likedByUser ? 'bg-red-500 text-white' : 'border-primary text-primary'}`}
                                >
                                    {likedByUser ? 'Unlike' : 'Like'}
                                </button>

                                <button
                                    onClick={handleFavorite}
                                    className={`btn ${savedByUser
                                            ? 'bg-yellow-500 text-white'
                                            : 'border-primary text-primary'
                                        }`}
                                >
                                    {savedByUser ? 'Remove Favorite' : 'Save to Favorites'}
                                </button>


                            </div>

                        </div>
                        <div className=' p-5'>
                            <h1 className='text-xl md:text-2xl font-bold text-primary text-center'>Interaction </h1>



                            <div className='flex flex-col gap-2 mt-5'>

                                <button onClick={() => handleReportModal(_id)} className="btn bg-green-700 hover:bg-green-800 text-white font-bold mt-auto">Report</button>

                                <button className="btn border-3 border-primary text-primary font-bold mt-2">Share</button>
                            </div>



                        </div>
                    </div>

                    <button></button>

                </div>
            </div>


            {/* Report Modal */}

            <dialog ref={reportRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">

                    <div className="card-body">
                        <h1 className="text-3xl md:text-5xl text-primary font-bold text-center">Report Lesson!</h1>
                        <form onSubmit={handleSubmit(handleSubmitReport)}>
                            <fieldset className="fieldset">
                                {/* Email Field */}

                                <label className="label text-black font-bold">Email</label>
                                <input type="email" {...register('reportedEmail', { required: true })} defaultValue={user.email} className="input focus:border-0 w-full" placeholder="Email" />

                                {/* Lesson ID */}
                                <label className="label text-black font-bold">Lesson ID</label>
                                <input type="text" {...register('lessonId', { required: true })} defaultValue={_id} className="input focus:border-0 w-full" placeholder="Lesson ID" />

                                {/*Reason  */}
                                <label className="label font-bold text-black mt-1">Reason</label>
                                <select defaultValue="Select Reason" {...register('reason')} className="select w-full ">
                                    <option disabled={true}> Select Reason</option>
                                    <option>Inappropriate Content</option>
                                    <option>Hate Speech or Harassment</option>
                                    <option>Misleading or False Information</option>
                                    <option>Spam or Promotional Content</option>
                                    <option>Sensitive or Disturbing Content</option>
                                    <option>Other</option>

                                </select>



                                <div className=' '>
                                    <button className="btn bg-green-700 text-white font-bold mt-4 w-full">Repor Now</button>

                                    <div className="modal-action ">
                                        <form method="dialog">

                                            <button className="btn ">Close</button>
                                        </form>
                                    </div>
                                </div>


                            </fieldset>

                        </form>
                    </div>


                </div>
            </dialog>

        </div>
    )
};

export default LessonDetails;