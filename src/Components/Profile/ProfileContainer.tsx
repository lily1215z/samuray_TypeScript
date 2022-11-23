import React from 'react';
import {Profile} from './Profile';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {getProfileUserTC} from '../../redux/posts-reducer';

import {
    Navigate,
    // @ts-ignore
    RouteComponentProps,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';


type ProfileContainerPropsType = ownPropsType & {
    addPost: (post: string) => void
}

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
    isAuth: boolean
}

type MapDispatchPropsType = {
    setUserProfileAC: (profile: ProfileResponseType) => void
}
type ownPropsType = MapStateToPropsType | MapDispatchPropsType

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
            userId=2;
        }
        this.props.getProfileUserTC(userId)
    }

    render() {

    if(!this.props.isAuth) return  <Navigate to={"/login"} />

        return (
            <Profile addPost={this.props.addPost} {...this.props} profile={this.props.profile} />
        );
    }

};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({  // not return y because I wrote ({...})
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {getProfileUserTC})(withRouter(ProfileContainer));

