import {connect} from 'react-redux';
import {
    followAC, followTC, getUsersTC,
    setCurrentPageAC, toggleIsFollowingProgressAC,
    unFollowAC, unFollowTC, UsersPageType,
} from '../../redux/users-reducer';
import React from 'react';
import {Users} from './Users';
import {AppRootStateType} from '../../redux/redux_store';
import {Preloader} from '../common/Preloader/Preloader';
import {compose} from 'redux';
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers,
} from '../../redux/users-selectors';

//type
type MapStateToPropsType = UsersPageType

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setCurrentPage: (pageNumber: number) => void
    toggleIsFollowingProgress: (toggle: boolean, userId: number) => void
    getUsersTC: (currentPage: number, pageSize: number) => void
    followTC: (id: number) => void
    unFollowTC: (id: number) => void
}
export type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<UsersContainerPropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsersTC(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        // const pageSize = {this.props}
        this.props.getUsersTC(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                followingInProgress={this.props.followingInProgress}

                setCurrentPage={this.props.setCurrentPage}
                isFetching={this.props.isFetching}
                getUsersTC={this.props.getUsersTC}
                followTC={this.props.followTC}
                unFollowTC={this.props.unFollowTC}
            />
        </>
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow: followAC,
        unfollow: unFollowAC,
        setCurrentPage: setCurrentPageAC,
        toggleIsFollowingProgress: toggleIsFollowingProgressAC,
        getUsersTC, unFollowTC, followTC,
    })
)(UsersContainer)

