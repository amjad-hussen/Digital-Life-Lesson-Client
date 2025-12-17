import React from 'react';
import useAuth from '../Hooks/useAuth';
import Loading from '../Component/SharedElement/Loading';
import useRole from '../Hooks/useRole';
import Forbidden from '../Component/Forbidden/Forbidden';

const AdminRoutes = ({children}) => {
    const {loading} = useAuth()
    const {roleLoading, role} = useRole()


    if(loading || roleLoading ){
        return <Loading></Loading>
    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }

    return children;
};

export default AdminRoutes;