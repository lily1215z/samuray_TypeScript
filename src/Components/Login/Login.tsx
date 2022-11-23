import React from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {Navigate} from 'react-router-dom';

export const Login = () => {
    const isLogginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    if(!isLogginIn) return <Navigate to={"/login"} />

    return (
        <div>
            Login
        </div>
    );
};

