import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const AddLesson = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()

    const handleAddLesson = (data) => {
        const lessonData = {
            lessonTitle: data.lessonTitle,
            userName: user.displayName,
            photoURL : user.photoURL,
            email: user.email,
            category: data.category,
            emotionalTone: data.emotionalTone,
            description: data.description,
            privacy: data.privacy,              
            accessLevel: data.accessLevel, 

            createdAt: new Date(),
            updatedAt: new Date(),
            likes: [],
            reactionsCount: 0,
            savesCount: 0,
            premiumUser: false
        }

        axiosSecure.post('/lessons', lessonData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "Added",
                        text: "Your Lesson has been Created Successfully.",
                        icon: "success"
                    })
                    reset()
                }
            })
    }

    return (
        <div className=''>
            <div className='border-b border-gray-200 pb-8 px-8 py-6 space-y-10'>
                <h1 className='text-2xl md:text-4xl font-bold text-primary mb-3'>Add New Lesson</h1>
                <p>Share your experience, wisdom & life-changing stories with the world.</p>
            </div>
            <div className="card bg-base-100 w-full md:max-w-1/2 shrink-0 mt-3 pl-10">
                <div className="card-body">
                    <form onSubmit={handleSubmit(handleAddLesson)}>
                        <fieldset className="fieldset">
                            {/* Lesson Title */}
                            <label className="label font-bold text-black">Lesson Title</label>
                            <input type="text" {...register('lessonTitle')} className="input focus:border-0 w-full" placeholder="Lesson Tittle" />

                            {/* Your Name */}
                            <label className="label font-bold text-black">Your Name</label>
                            <input type="text" {...register('name')} Value={user.displayName} readOnly className="input focus:border-0 w-full" placeholder="Your Name" />

                            {/* User Email */}
                            <label className="label font-bold text-black">Your Email</label>
                            <input type="email" {...register('email')} Value={user.email} readOnly className="input focus:border-0 w-full" placeholder="Your Email" />

                            {/*Category Field  */}
                            <label className="label font-bold text-black mt-1">Select Category</label>
                            <select defaultValue="Select Category" {...register('category')} className="select w-full ">
                                <option disabled={true}> Select Category</option>
                                <option>Personal Growth</option>
                                <option>Career</option>
                                <option>Relationships</option>
                                <option>Mindset</option>
                                <option>Mistakes Learned</option>

                            </select>


                            {/*Emotional Tone Field  */}
                            <label className="label font-bold text-black mt-1">Emotional Tone</label>
                            <select defaultValue="Select Emotional Tone" {...register('emotionalTone')} className="select w-full">
                                <option disabled={true}>Emotional Tone</option>
                                <option>Motivational</option>
                                <option>Sad</option>
                                <option>Realization</option>
                                <option>Gratitude</option>


                            </select>

                            {/*Privacy  Field  */}
                            <label className="label font-bold text-black mt-1">Privacy </label>
                            <select defaultValue="Select Privacy " {...register('privacy')} className="select w-full">
                                <option disabled={true}>Privacy </option>
                                <option>Public</option>
                                <option>Private</option>

                            </select>

                            {/*Access Level  Field  */}
                            <label className="label font-bold text-black mt-1">Access Level </label>
                            <select defaultValue="Select Access Level " {...register('accessLevel')} className="select w-full">
                                <option disabled={true}>Access Level </option>
                                <option>Free</option>
                                <option>Premium </option>

                            </select>

                            {/* Lesson Description  */}
                            <label className="label font-bold text-black  mt-1">Lesson Description</label>
                            <textarea className="textarea w-full focus:border-0" {...register('description')} placeholder="Lesson Description "></textarea>


                            <button className="btn bg-green-700 hover:bg-green-800 text-white font-bold mt-4">Add Lesson</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLesson;



