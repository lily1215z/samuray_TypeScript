import React from 'react';
import {Header} from './Header';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';


class HeaderContainer extends React.Component<HeaderContainerPropsType> {
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps)(HeaderContainer)


// type
export type HeaderContainerPropsType = MapStateToPropsType

type MapStateToPropsType = {
    // isAuth: ResponsePropsType,
    // login: ResponsePropsType   //or ???
    isAuth: boolean,
    login: string | null
}