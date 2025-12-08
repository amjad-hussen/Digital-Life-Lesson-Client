import React from 'react';
import logo from '../../assets/logo-green.png'
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';

const Login = () => {

    const { register, handleSubmit, } = useForm()
    const { signInUser } = useAuth()
    const location =  useLocation()
    const navigate = useNavigate()

    const handleLogin = (data) => {
        signInUser(data.email, data.password)
            .then(() => {
                navigate(location?.state || '/')
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
                    <h1 className="text-3xl md:text-5xl text-primary font-bold text-center">Login now!</h1>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <fieldset className="fieldset">
                            {/* Email Field */}

                            <label className="label text-black font-bold">Email</label>
                            <input type="email" {...register('email', { required: true })} className="input focus:border-0" placeholder="Email" />

                            {/* Password Field */}
                            <label className="label text-black font-bold">Password</label>
                            <input type="password" {...register('password', { required: true })} className="input focus:border-0" placeholder="Password" />

                            <div><a className="link link-hover">Forgot password?</a></div>

                            <button className="btn bg-green-700 text-white font-bold mt-4">Login</button>


                        </fieldset>

                    </form> 
                    <SocialLogin></SocialLogin>

                    <p className='text-center mt-2'>Don't have any account? Please <Link state={location.state} to={'/register'} className='text-blue-700 hover: underline font-bold'>Register</Link></p>
                </div>
            </div>
        </div>

    );
};

export default Login;