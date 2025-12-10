import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Upgrade = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const handlePayment = async() => {
        const paymentInfo = {
            email : user.email
        }
        const res = await axiosSecure.post('/create-checkout-session', paymentInfo)
        window.location.href =res.data.url

    }

    return (
        <div className='bg-white my-5 mx-10 p-10 rounded-xl'>
            <div className='text-center'>
                <h1 className='text-2xl md:text-4xl font-bold text-primary mb-3'>Upgrade to Premium</h1>
                <p className='border-b border-gray-200 pb-5'>One-time 1500 Taka payment. Lifetime access</p>
            </div>

            <div className='mt-5 '>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr className='text-primary'>
                                <th></th>
                                <th >Name</th>
                                <th>Free</th>
                                <th>Premium</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <th>1</th>
                                <td>Create Lesson</td>
                                <td>Limited</td>
                                <td>Unlimited</td>
                            </tr>
                            {/* row 2 */}
                            <tr>
                                <th>2</th>
                                <td>AccessLevel</td>
                                <td>Free Only</td>
                                <td>Free + Premium</td>
                            </tr>
                            {/* row 3 */}
                            <tr>
                                <th>3</th>
                                <td>Add Experience</td>
                                <td>With Adds </td>
                                <td>Add Free</td>
                            </tr>
                            {/* row 4 */}
                            <tr>
                                <th>4</th>
                                <td>Lesson Priority</td>
                                <td>Low </td>
                                <td>High Priority Listing</td>
                            </tr>
                            {/* row 5 */}
                            <tr>
                                <th>5</th>
                                <td>Support</td>
                                <td>Email </td>
                                <td>Priority Support</td>
                            </tr>
                            {/* row 6 */}
                            <tr>
                                <th>6</th>
                                <td>Storage</td>
                                <td>Limited </td>
                                <td>Unlimited</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>

             <Link className='flex justify-center mt-10'> <button onClick={handlePayment} className='btn bg-green-700 rounded-md text-white font-semibold text-xl  shadow-2xl px-10 py-6 '>Upgrade Now (৳1500)</button></Link>
        </div>
    );
};

export default Upgrade;