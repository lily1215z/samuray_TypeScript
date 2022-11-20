import React from 'react';
import {Profile} from './Profile';
import axios from 'axios';
import {connect} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {setUserProfileAC} from '../../redux/posts-reducer';

type ProfileContainerPropsType = any & {
    addPost: (post: string) => void
}

class ProfileContainer extends React.Component<ProfileContainerPropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0//profile/2`)
            .then(res => {
                this.props.setUserProfileAC(res.data)
            })
    }

    render() {
        return (
            <Profile addPost={this.props.addPost} {...this.props} profile={this.props.profile} />
        );
    }

};

const mapStateToProps = (state: AppRootStateType) => ({  // not return y I wrote ({...})
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfileAC})(ProfileContainer)