import {usersAPI} from '../api/api';
import {Dispatch} from 'redux';
import {updateObjectInArray} from '../utils/object-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UN-FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

const initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,   //со старта будет 1 страница. всегда будем запрашивать 1 стр
    isFetching: false,
    followingInProgress: []
}

export const UsersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: state.users.map((i: UserType) => i.id === action.userId ? {...i, followed: true} : i)  БЫЛО
                users: updateObjectInArray(state.users, action.userId, 'id',   {followed: true})  //СТАЛО
            }

        case UNFOLLOW:
            return {
                ...state,
                // users: state.users.map((i: UserType) => i.id === action.userId ? {...i, followed: false} : i)
                users: updateObjectInArray(state.users, action.userId, 'id',   {followed: false})
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
    dispatch(toggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(currentPage))    //выводит на какой стр мы сейчас находимся - подсвечивается активная стр

    let res = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetchingAC(false))
    dispatch(setUsersAC(res.data.items))
    dispatch(setUsersTotalCountAC(res.data.totalCount))
}

//рефакторинг для санки followTC и unFollowTC
const followUnfollowFlow = async (dispatch: Dispatch, id: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleIsFollowingProgressAC(true, id))
    let res = await apiMethod(id)
    if (res.data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(toggleIsFollowingProgressAC(false, id))
}

export const followTC = (id: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.followUser.bind(usersAPI)
    followUnfollowFlow(dispatch, id, apiMethod, followAC)    //рефакторинг 90 урок - 20 мин
}

export const unFollowTC = (id: number) => async (dispatch: Dispatch) => {
    let apiMethod = usersAPI.unfollowUser.bind(usersAPI)
    followUnfollowFlow(dispatch, id, apiMethod, unFollowAC)
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
