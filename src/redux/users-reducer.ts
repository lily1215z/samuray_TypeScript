import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {handleServerAppError, handleServerNetworkError, updateObjectInArray} from '../utils/object-helpers';
import axios from 'axios';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UN-FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [],
    pageSize: 12,
    totalUsersCount: 0,
    currentPage: 1,   //in start will be first page.
    isFetching: false,
    followingInProgress: []
}

export const UsersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: state.users.map((i: UserType) => i.id === action.userId ? {...i, followed: true} : i)  was
                users: updateObjectInArray(state.users, action.userId, 'id',   {followed: true})  //now
            }

        case UNFOLLOW:
            return {
                ...state,
                // users: state.users.map((i: UserType) => i.id === action.userId ? {...i, followed: false} : i)
                users: updateObjectInArray(state.users, action.userId, 'id',   {followed: false})
            }

        case SET_USERS:
            return {...state, users: action.users}
            // return {...state, users: [...action.users, ...state.users]}  //49lesson 34 min when need old state plus new state

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber}

        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.toggle}

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state, followingInProgress: action.toggle
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state
    }
};

//action creator
export const followAC = (userId: number) => ({type: FOLLOW, userId} as const)
export const unFollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const)
export const setUsersTotalCountAC = (totalCount: number) => ({type: SET_USERS_TOTAL_COUNT, totalCount} as const)
export const toggleIsFetchingAC = (toggle: boolean) => ({type: TOGGLE_IS_FETCHING, toggle} as const)
export const toggleIsFollowingProgressAC = (toggle: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    toggle,
    userId
} as const)

//thunk
export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(toggleIsFetchingAC(true))
        dispatch(setCurrentPageAC(currentPage))    //What current page now we stay - active page illuminated.

        let res = await usersAPI.getUsers(currentPage, pageSize)
        if(res.data) {
            dispatch(toggleIsFetchingAC(false))
            dispatch(setUsersAC(res.data.items))
            dispatch(setUsersTotalCountAC(res.data.totalCount))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }

}

//Refactoring for thunks followTC & unFollowTC
const followUnfollowFlow = async (dispatch: Dispatch, id: number, apiMethod: any, actionCreator: any) => {
    try {
        dispatch(toggleIsFollowingProgressAC(true, id))
        const res = await apiMethod(id)
        if (res.data.resultCode === 0) {
            dispatch(actionCreator(id))
        } else {
            handleServerAppError(res.data, dispatch) //ошибки наши
        }
        dispatch(toggleIsFollowingProgressAC(false, id))
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)  //др ошибки
        }
    }

}

export const followTC = (id: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.followUser.bind(usersAPI)
    followUnfollowFlow(dispatch, id, apiMethod, followAC)    //refactoring 90 lesson - 20 min
}

export const unFollowTC = (id: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    followUnfollowFlow(dispatch, id, apiMethod, unFollowAC)
}

//type
type followTypeAC = ReturnType<typeof followAC>
type unfollowTypeAC = ReturnType<typeof unFollowAC>

export type UsersActionType =  followTypeAC | unfollowTypeAC
    | ReturnType<typeof setUsersAC> | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC> | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleIsFollowingProgressAC>

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: {
        small: string,
        large: string
    },
    followed: boolean
}

export type UsersPageType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}
