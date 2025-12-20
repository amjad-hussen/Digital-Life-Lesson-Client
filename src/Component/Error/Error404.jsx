import React from 'react';
import { useNavigate } from 'react-router';

const Error404 = () => {

    const navigate = useNavigate();

    const handleBackHome = () => {
        navigate('/');
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
                <div className="text-yellow-500 text-6xl mb-5">⚠️</div>
                <h1 className="text-primary text-3xl font-bold mb-3">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    Oops! The page you are looking for does not exist. It might have been removed or the URL is incorrect.
                </p>
                <button
                    onClick={handleBackHome}
                    className="btn bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded-md"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default Error404;