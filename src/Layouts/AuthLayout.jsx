import React from 'react';
import Login from '../Pages/Auth/Login';
import { Outlet } from 'react-router';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto bg-gray-100'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;