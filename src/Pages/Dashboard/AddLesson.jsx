import React from 'react';
import { useForm } from 'react-hook-form';

const AddLesson = () => {
    const {register, handleSubmit} = useForm()

    const handleAddLesson = (data) => {
        console.log('add lesson', data)
    }

    return (
        <div className=''>
            <div className='border-b border-gray-200 pb-8'>
                <h1 className='text-2xl md:text-4xl font-bold text-primary mb-3'>Add New Lesson</h1>
                <p>Share your experience, wisdom & life-changing stories with the world.</p>
            </div>
            <div className="card bg-base-100 w-full max-w-1/2 shrink-0 mt-3 pl-10">
                <div className="card-body">
                    <form onSubmit={handleSubmit(handleAddLesson)}>
                        <fieldset className="fieldset">
                            {/* Lesson Title */}
                            <label className="label font-bold text-black">Lesson Title</label>
                            <input type="text" {...register('lessonTitle')} className="input focus:border-0 w-full" placeholder="Lesson Tittle" />

                            {/*Category Field  */}
                            <label className="label font-bold text-black mt-1">Lesson Title</label>
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
                            <select defaultValue="Select Privacy " {...register('privacy ')} className="select w-full">
                                <option disabled={true}>Privacy </option>
                                <option>Public</option>
                                <option>Private</option>
                             
                            </select>

                            {/*Access Level  Field  */}
                            <label className="label font-bold text-black mt-1">Access Level </label>
                            <select defaultValue="Select Access Level " {...register('accessLevel ')} className="select w-full">
                                <option disabled={true}>Access Level </option>
                                <option>Free</option>
                                <option>Premium </option>
                             
                            </select>


                            <button className="btn bg-green-700 hover:bg-green-800 text-white font-bold mt-4">Add Lesson</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLesson;