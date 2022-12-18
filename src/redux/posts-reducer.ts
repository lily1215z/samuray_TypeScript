
import {ProfileResponseType} from '../Components/Profile/ProfileContainer';
import {Dispatch} from 'redux';
import { profileAPI} from '../api/api';
import {AppRootStateType, AppThunk} from './redux_store';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET_STATUS'
const UPDATE_STATUS = 'UPDATE_STATUS'
const DELETE_POST = 'DELETE_POST'
// const SAVE_PROFILE = 'SAVE_PROFILE'
// const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

const initialState = {
    posts: [
        {
            id: 1,
            post: 'hello, my dear friend',
            img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png',
            like: 5
        },
    ],
    // profile: null,          // or {} or null
    profile: {
        userId: 12,
        lookingForAJob: true,
        lookingForAJobDescription: 'выводит initialState',
        aboutMe: 'это то что написано в initialState',
        fullName: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },
        photos: {
            small: '',
            large: ''
        }
    },
    status: ''
}

// export const ProfileReducer = (state: any = initialState, action: PostsReducerActionType): any => {
export const ProfileReducer = (state: ProfilePageType = initialState, action: PostsReducerActionType): ProfilePageType => {
// export const ProfileReducer = (state: Array<PostsType> = initialState, action: PostsReducerActionType): Array<PostsType> => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                id: 2,
                post: action.post,
                img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png',
                like: 5
            }
            return {...state, posts: [newPost, ...state.posts]}  //48 урок самурая 33 мин

        case SET_USER_PROFILE:
            console.log("newData", action.profile)
            return {...state, profile: action.profile}

        case SET_STATUS:
        case UPDATE_STATUS:
            return {...state, status: action.status}

        case DELETE_POST:
            return {...state, posts: state.posts.filter(i => i.id !== action.postId)}

        // case SAVE_PHOTO_SUCCESS:
        //     return {...state, profile: {...state.profile, photos: action.file}}

        default:
            return state;
    }
}

//action creator
export const addPostsReducerAC = (post: string) => {
    return {type: ADD_POST, post: post} as const
}
export const setUserProfileAC = (profile: ProfileResponseType) => {
    return {type: SET_USER_PROFILE, profile} as const
}
export const setStatusUserAC = (status: string) => {
    return {type: SET_STATUS, status} as const
}
export const updateStatusUserAC = (status: string) => {
    return {type: UPDATE_STATUS, status} as const
}
export const deletePostAC = (postId: number) => {
    return {type: DELETE_POST, postId} as const
}
// export const savePhotoAC = (file: ChangeEvent<HTMLInputElement>) => {
//     return {type: SAVE_PHOTO_SUCCESS, file} as const
// }

//thunk
export const getProfileUserTC = (userId: number) => async (dispatch: Dispatch) => {
    let res = await profileAPI.getProfileUser(userId)
    dispatch(setUserProfileAC(res.data))
}

export const getStatusUserTC = (userId: number) => async (dispatch: Dispatch) => {
    let res = await profileAPI.getStatusUser(userId)
    dispatch(setStatusUserAC(res.data))
}

export const updateStatusUserTC = (status: string) => async (dispatch: Dispatch) => {
    try {
        let res = await profileAPI.updateStatusUser(status)
        if (res.data.resultCode === 0) {
            dispatch(setStatusUserAC(status))
        }
    } catch (e) {
        console.log(e)
    }
}

export const saveProfileTC = (profile: ProfileResponseType): AppThunk => async (dispatch, getState: ()=> AppRootStateType) => {
    const userId = getState().auth.userId
    const res = await profileAPI.saveProfile(profile)
    console.log(res)
    if (res.data.resultCode === 0) {
        if (userId) {   //делаю проверку т.к. типизация ругается что может прийти еще и null
            // let res = await profileAPI.getProfileUser(userId)       //97 lesson. 48min
            // dispatch(setUserProfileAC(res.data))

            await dispatch(getProfileUserTC(userId))
        }
    } else {
        console.log('все упало :(')
    }
}

// export const savePhotoTC = (file: ChangeEvent<HTMLInputElement>) => async (dispatch: Dispatch) => {
//     let res = await profileAPI.savePhoto(file)
//     if (res.data.resultCode === 0) {
//         dispatch(savePhotoAC(res.data.data.photos))
//     }
// }

//type
export type PostsReducerActionType = ReturnType<typeof addPostsReducerAC>
    | ReturnType<typeof setUserProfileAC> | ReturnType<typeof setStatusUserAC> | ReturnType<typeof updateStatusUserAC>
    | ReturnType<typeof deletePostAC>
    // | ReturnType<typeof savePhotoAC>

export type PostsType = {
    id: number
    post: string
    img: string
    like: number
}

export type ProfilePageType = {
    posts: Array<PostsType>
    profile: ProfileResponseType
    status: string
}

