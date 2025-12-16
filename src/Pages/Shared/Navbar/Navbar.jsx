import React from 'react';
import './Navbar.css'
import logo from '../../../assets/logo-green.png'
import userImg from '../../../assets/user.png'
import { Link, NavLink } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Component/SharedElement/Loading';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const Navbar = () => {
    const { user, logOut, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { refetch, data: currentUser , isLoading} = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            refetch()
            return res.data
        }

    })
    

    if (loading || isLoading) {
        return <Loading></Loading>
    }

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => {
                console.log(error)
            })
    }


    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/public-lesson'}>Public Lesson</NavLink></li>
        {
            user && <>
                <li><NavLink to={'/dashboard/add-lesson'}>Add Lesson</NavLink></li>
                <li><NavLink to={'/dashboard/my-lesson'}>My Lesson</NavLink></li>


                {currentUser?.isPremium ? (
                    <li><span>Premium ⭐</span></li>
                ) : (
                    <li><NavLink to="/upgrade">Upgrade to Premium</NavLink></li>
                )}

            </>
        }


    </>

    return (
        <div className="navbar bg-base-100 shadow-sm px-10">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'}><img src={logo} className='h-13' alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?

                        (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-10 rounded-full border border-gray-300">
                                        <img
                                            alt="profile"
                                            src={user?.photoURL || userImg}
                                        />
                                    </div>
                                </div>

                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-100 p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-xl w-52 space-y-1"
                                >
                                    <li className="text-center font-semibold py-1">
                                        {user?.displayName || "Guest"}
                                    </li>
                                    <div className="divider my-0"></div>

                                    <li>
                                        <Link to="/dashboard/profile" className="hover:bg-gray-200 rounded-lg">
                                            Profile
                                        </Link>
                                    </li>

                                    <li>
                                        <Link to="/dashboard/home" className="hover:bg-gray-200 rounded-lg">
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li>
                                        <button
                                            onClick={handleLogOut}
                                            className="text-red-600 hover:bg-red-100 rounded-lg"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )

                        :
                        <div className='flex gap-3'>
                            <Link to={'/login'}> <button className='btn bg-green-700 rounded-md text-white font-semibold'>Login</button></Link>

                            <Link to={'/register'}> <button className='btn border-2 border-green-700  rounded-md text-primary font-semibold'>Register</button></Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;