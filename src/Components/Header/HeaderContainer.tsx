import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {getAuthMeTC} from '../../redux/auth-reducer';
import {AppRootStateType} from '../../redux/redux_store';


class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        this.props.getAuthMeTC()
    }
//проверяем в консоли store.getState().auth
    render() {
        return <Header {...this.props} />
    }
}

// type
export type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapDispatchToPropsType = {
    getAuthMeTC: () => void
}

type ResponsePropsType<T = {}> = {
    resultCode: number,
    messages: Array<string>
    // data: {
    //     id: number,
    //     email: string,
    //     login: string
    // },
    data: T
}

type MapStateToPropsType = {
    isAuth: ResponsePropsType,
    login: ResponsePropsType
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})
export default connect(mapStateToProps, {getAuthMeTC})(HeaderContainer)