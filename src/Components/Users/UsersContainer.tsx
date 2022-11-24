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
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

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
    // constructor(props: any) {  //т.к. происходит только переброска в супер ничего то можем не писать его вовсе
    //     super(props);
    // }

    componentDidMount() {
        this.props.getUsersTC(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
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

//контейнерная компонента с коннектом
const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
    return {                 //все что ниже это все попадает в пропсы
        users: state.users.users,  //49 lesson samuray 41 min
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFetching: state.users.isFetching,
        followingInProgress: state.users.followingInProgress
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps, {
        follow: followAC,
        unfollow: unFollowAC,
        setCurrentPage: setCurrentPageAC,
        toggleIsFollowingProgress: toggleIsFollowingProgressAC,
        getUsersTC, unFollowTC, followTC,
    })
)(UsersContainer)

