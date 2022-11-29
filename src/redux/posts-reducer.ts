import {v1} from 'uuid';
import {ProfileResponseType} from '../Components/Profile/ProfileContainer';
import {Dispatch} from 'redux';
import {profileAPI} from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET_STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'

const initialState = {
    posts: [
        {
            id: v1(),
            post: 'hello, my dear friend',
            img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png',
            like: 5
        },
    ],
    profile: null,          // or {} or null
    status: ''
}

// export const ProfileReducer = (state: any = initialState, action: PostsReducerActionType): any => {
export const ProfileReducer = (state: ProfilePageType = initialState, action: PostsReducerActionType): ProfilePageType => {
// export const ProfileReducer = (state: Array<PostsType> = initialState, action: PostsReducerActionType): Array<PostsType> => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: v1(),
                post: action.post,
                img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png',
                like: 5
            }
            return {...state, posts: [newPost, ...state.posts]}  //48 урок самурая 33 мин

        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        case SET_STATUS:
        case UPDATE_STATUS:
            return {...state, status: action.status}

        default:
            return state;
    }
}

//type
export type PostsReducerActionType = ReturnType<typeof addPostsReducerAC>
    | ReturnType<typeof setUserProfileAC> | ReturnType<typeof setStatusUserAC> | ReturnType<typeof updateStatusUserAC>

//action creator
export const addPostsReducerAC = (post: string) => {
    return {type: ADD_POST, post: post} as const
}
export const setUserProfileAC = (profile: ProfileResponseType) => {           //hacer type para profile
    return {type: SET_USER_PROFILE, profile} as const
}
export const setStatusUserAC = (status: string) => {
    return {type: SET_STATUS, status} as const
}
export const updateStatusUserAC = (status: string) => {
    return {type: UPDATE_STATUS, status} as const
}

//thunk
export const getProfileUserTC = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getProfileUser(userId)
        .then(res => {
            dispatch(setUserProfileAC(res.data))
        })
}
export const getStatusUserTC = (userId: number) => (dispatch: Dispatch) => {
    profileAPI.getStatusUser(userId)
        .then(res => {
            dispatch(setStatusUserAC(res.data))
        })
}

export const updateStatusUserTC = (status: string) => (dispatch: Dispatch) => {
    profileAPI.updateStatusUser(status)
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setStatusUserAC(status))
            }
        })
}


//type
export type PostsType = {
    id: string
    post: string
    img: string
    like: number
}

export type ProfilePageType = {
    posts: Array<PostsType>
    profile: any                          //hacer type para profile
    status: string
}

