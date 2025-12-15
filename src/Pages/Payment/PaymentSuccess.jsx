import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = ({ refetch }) => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id')
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    console.log(sessionId)


    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/verify-payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    if (res.data.success) {
                        
                         axiosSecure.patch('/users/premium', { email: res.data.userEmail });
                        refetch();
                    }

                    navigate('/dashboard');
                })
        }
    }, [sessionId, axiosSecure, refetch, navigate])

    return (
        <div>
            <h1>payment successfull</h1>
        </div>
    );
};

export default PaymentSuccess;