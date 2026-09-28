import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../DataProvider/DataProvider';

const ProtectedRoute = ({ children, msg, redirect }) => {
    const navigate = useNavigate();
    const { state: { user } } = useContext(DataContext);

    useEffect(() => {
        if (!user) {
            navigate("/auth", { state: { msg, redirect } });
        }
    }, [user, navigate, msg, redirect]);

    return user ? children : null;
};

export default ProtectedRoute;
