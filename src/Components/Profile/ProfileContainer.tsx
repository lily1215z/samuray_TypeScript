import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {addPostsReducerAC, getProfileUserTC, getStatusUserTC, updateStatusUserTC} from '../../redux/posts-reducer';

import {
    // @ts-ignore
    RouteComponentProps,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose, Dispatch} from 'redux';


type ProfileContainerPropsType = MapStateToPropsType | MapDispatchPropsType

export type ProfileResponseType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
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

type MapStateToPropsType = {
    profile: ProfileResponseType,
    isAuth: boolean,
    status: string,
    authorizedUserId: number
}

type MapDispatchPropsType = {
    setUserProfileAC: (profile: ProfileResponseType) => void
    addPost: (post: string) => void
}

type PathParamsType = {
    userId: string
}
type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerPropsType  //RouteComponentProps загуглила решение

function withRouter(Component: any) {   //need fixed
    function ComponentWithRouterProp(props: any) {  //need fixed  бы поставила ProfileContainerPropsType
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component<PropsType> {
    componentDidMount() {
        let userId = this.props.router.params.userId;
        if(!userId) {
            userId=this.props.authorizedUserId;
        }
        this.props.getProfileUserTC(userId)
        this.props.getStatusUserTC(userId)
    }

    render() {
        return (
            <Profile addPost={this.props.addPost} {...this.props}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatusUserTC}
            />
        );
    }
};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({  // not return y because I wrote ({...})
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addPost: (post: string) => {
            dispatch(addPostsReducerAC(post))
        },
        getProfileUserTC, getStatusUserTC, updateStatusUserTC
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthRedirect
)(ProfileContainer)