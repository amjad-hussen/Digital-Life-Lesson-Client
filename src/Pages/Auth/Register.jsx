import React from 'react';
import logo from '../../assets/logo-green.png'
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, updateUserProfile } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handleRegister = (data) => {
        console.log('handleregister', data.photo[0])
        const profileImage = data.photo[0];

        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)

                // Store the image for getting the photoURL
                const formData = new FormData()
                formData.append('image', profileImage)

                const image_API_URL =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_host_key}`
                
                axios.post(image_API_URL, formData)
                .then( res => {
                    console.log('after image uploaded', res.data.data.url)

                    // update User Profile
                    const userProfile = {
                        displayName: data.name,
                        photoURL: res.data.data.url 
                    }
                    updateUserProfile(userProfile)
                    .then( ( )=>{
                        console.log('user Profile Updated done')
                        navigate(location?.state || '/')
                    })
                    .catch(error => {
                        console.log(error)
                    })
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className=' px-10 my-10 flex justify-around items-center gap-20 '>
            <div className='hidden md:block'>
                <img className='h-25 mb-3' src={logo} alt="" />
                <p >Capture, organize, and share the wisdom you’ve gathered <br />throughout your life. Learn from your experiences <br /> and from the community to grow every day.</p>
            </div>

            <div className="card  bg-base-100 w-full max-w-sm shrink-0 shadow-2xl  ">
                <div className="card-body">
                    <h1 className="text-3xl md:text-5xl text-center text-primary  font-bold">Register now!</h1>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <fieldset className="fieldset">

                            {/* Name Field */}
                            <label className="label text-black font-bold">Your Name</label>
                            <input type="text"{...register('name', { required: true })} className="input focus:border-0" placeholder="Your Name" />

                            {/* Email Field */}

                            <label className="label text-black font-bold">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input focus:border-0" placeholder="Email" />

                            {/* Photo Field */}
                            <label className="label text-black font-bold">Your Photo</label>
                            <input type="file" {...register('photo', { required: true })} className="file-input" />

                            {/* Password Field */}
                            <label className="label text-black font-bold">Password</label>
                            <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/ })} className="input focus:border-0" placeholder="Password" />

                            {errors.password?.type === 'minLength' && (<p className='text-red-500'>
                                Password Must be 6 char or longer
                            </p>)}

                            {errors.password?.type === 'pattern' && (<p className='text-red-500'>
                                Password Must be Include upper & lower case
                            </p>)}


                            <button className="btn bg-green-700 text-white font-bold mt-4">Register</button>


                        </fieldset>


                    </form>
                    <SocialLogin ></SocialLogin>


                    <p className='text-center mt-2' >Already have an account? Please <Link state={location.state} to={'/login'} className='text-blue-700 hover: underline font-bold  '>Login </Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;