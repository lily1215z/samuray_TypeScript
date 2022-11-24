import React, {ComponentType} from 'react';
import {Navigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {AppRootStateType} from '../redux/redux_store';


//Function Component HOC
type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppRootStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStatePropsType) => {
        const {isAuth, ...restProps} = props;

        if (!isAuth) return <Navigate to={"/login"} />
        return <Component {...restProps as T} />
    }

    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent
}