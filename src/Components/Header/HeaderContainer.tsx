import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {setAuthUserDataAC} from '../../redux/auth-reducer';
import {AppRootStateType} from '../../redux/redux_store';
import {authAPI} from '../../api/api';


class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    componentDidMount() {
        authAPI.getAuthMe()
            .then(res => {
                if (res.data.resultCode === 0) {
                    let {id, email, login} = res.data.data  //деструктуризация
                    this.props.setAuthUserDataAC(id, email, login)
                }
            })
    }
//проверяем в консоли store.getState().auth
    render() {
        return <Header {...this.props} />
    }
}

// type
export type HeaderContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapDispatchToPropsType = {
    setAuthUserDataAC: (id: number, email: string, login: string) => void
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
export default connect(mapStateToProps, {setAuthUserDataAC})(HeaderContainer)