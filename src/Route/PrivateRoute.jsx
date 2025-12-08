import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()


    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-white">
            <div className="flex flex-col items-center gap-4">
                {/* Animated Spinner */}
                <div className="w-12 h-12 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>

                {/* Text */}
                <p className="text-lg font-semibold text-gray-700">
                    Loading...
                </p>
            </div>
        </div>
    }

    if (!user) {
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }
    return children;
};

export default PrivateRoute;