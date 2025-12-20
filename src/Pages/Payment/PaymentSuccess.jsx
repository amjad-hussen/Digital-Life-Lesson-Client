import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()




    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .patch(`/verify-payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data);
                    
                })
                .catch(err => console.log(err));
        }
    }, [sessionId, axiosSecure, navigate]);

    const handleBackHome = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-5">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
                <div className="text-green-600 text-6xl mb-5">✔️</div>
                <h1 className="text-primary text-3xl font-bold mb-3">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your payment. Your transaction has been completed successfully.
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

export default PaymentSuccess;