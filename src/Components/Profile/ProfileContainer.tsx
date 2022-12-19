import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {
    getProfileUserTC,
    getStatusUserTC,
    updateStatusUserTC
} from '../../redux/posts-reducer';

import {
    // @ts-ignore
    RouteComponentProps,
} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {withRouter} from '../../hoc/withRouter';

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile() {
        let userId = this.props.router.params.userId;
        // let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.getProfileUserTC(userId)
        this.props.getStatusUserTC(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        //96 lessons samuray 13 min
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }

    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.router.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatusUserTC}
                // savePhoto={this.props.savePhotoTC}
            />
        );
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({  // not return y because I wrote ({...})
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})


//когда делала отд mapDispatchToProps и в нее все влаживала то не работало. лучше передавать в connect напрямую
export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfileUserTC, getStatusUserTC, updateStatusUserTC}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

//type
type MapStateToPropsType = {
    profile: ProfileResponseType,
    isAuth: boolean,
    status: string,
    authorizedUserId: number | null
    // authorizedUserId: number
}

type MapDispatchPropsType = {
    getProfileUserTC: (userId: number) => void
    getStatusUserTC: (userId: string) => void
    updateStatusUserTC: (status: string) => void
}

type PathParamsType = {
    userId: string
}

type ProfileContainerPropsType = MapStateToPropsType | MapDispatchPropsType

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType  //RouteComponentProps загуглила решение

export type ProfileResponseType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    aboutMe: string,
    fullName: string,
    contacts: {
        github: string,
        vk: string,
        facebook: string,
        instagram: string,
        twitter: string,
        website: string,
        youtube: string,
        mainLink: string,
    }
    photos: {
        small: string,
        large: string
    }
}


