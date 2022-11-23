import {authAPI, profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {setAuthUserDataAC} from './auth-reducer';
import {setUserProfileAC} from './posts-reducer';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UN-FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

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

const initialState = {
    users: [],
    pageSize: 2,
    totalUsersCount: 0,
    currentPage: 1,   //со старта будет 1 страница. всегда будем запрашивать 1 стр
    isFetching: false,
    followingInProgress: []
}

export type UsersPageType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

export const UsersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            // return {...state, users: [...state.users.map((i: any )=> i.userId === action.userId ? i.followed === true : i)]}

            //нужно сделать копию самого обьекта в кот меняем. выше пример там напрямую мутирую обьект - плохо. внизу - верно
            return {
                ...state,
                users: [...state.users.map((i: any) => i.userId === action.userId ? {...i, followed: true} : i)]
            }

        case UNFOLLOW:
            return {
                ...state,
                users: [...state.users.map((i: any) => i.userId === action.userId ? {...i, followed: false} : i)]
            }

        case SET_USERS:
            // return {...state, users: action.users}
            return {...state, users: [...action.users, ...state.users]}  //склеиваем старый state с новым 49lesson 34 min

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

export type UsersActionType = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC> | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC> | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleIsFollowingProgressAC>

//thunk
export const getUsersTC = (currentPage: number, pageSize:number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetchingAC(true))
    usersAPI.getUsers(currentPage, pageSize).then(res => {
        dispatch(toggleIsFetchingAC(false))
        dispatch(setUsersAC(res.data.items))
        dispatch(setUsersTotalCountAC(res.data.totalCount))
    })
}

export const followTC = (id: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFollowingProgressAC(true, id))
    usersAPI.followUser(id)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(followAC(id))
            }
            dispatch(toggleIsFollowingProgressAC(false, id))
        })
}

export const unFollowTC = (id: number) => (dispatch: Dispatch) => {
   dispatch(toggleIsFollowingProgressAC(true, id))
    usersAPI.unfollowUser(id)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(unFollowAC(id))
            }
            dispatch(toggleIsFollowingProgressAC(false, id))
        });
}

// export const getAuthMeTC = () => (dispatch: Dispatch) => {
//     authAPI.getAuthMe()
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 let {id, email, login} = res.data.data               //деструктуризация
//                 dispatch(setAuthUserDataAC(id, email, login))
//             }
//         })
// }
