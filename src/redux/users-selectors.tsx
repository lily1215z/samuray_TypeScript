import {AppRootStateType} from './redux_store';
import {createSelector} from 'reselect';

const getUsersSelector = (state: AppRootStateType) => {
   return state.users.users
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(i=> true)
})

export const getPageSize = (state: AppRootStateType) => {
    return state.users.pageSize
}
export const getTotalUsersCount = (state: AppRootStateType) => {
    return state.users.totalUsersCount
}

export const getCurrentPage = (state: AppRootStateType) => {
    return state.users.currentPage
}

export const getIsFetching = (state: AppRootStateType) => {
    return state.users.isFetching
}

export const getFollowingInProgress= (state: AppRootStateType) => {
    return state.users.followingInProgress
}
