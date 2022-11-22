import {v1} from 'uuid';
import {ProfileResponseType} from '../Components/Profile/ProfileContainer';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE'

const initialState = {
    posts: [
        {
            id: v1(),
            post: 'hello, my dear friend',
            img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png',
            like: 5
        },
    ],
    profile: null          // or {}
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

        case UPDATE_NEW_POST_TEXT:
            //return {...state, newPostText: action.newText}    //48 урок самурая 33 мин
            // return {...state, posts: [...state.posts, {post: action.newText}]}
            return state

        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        default:
            return state;
    }
}

//type
export type PostsReducerActionType = ReturnType<typeof addPostsReducerAC> | ReturnType<typeof updatePostsReducerAC>
| ReturnType<typeof setUserProfileAC>

//action creator
export const addPostsReducerAC = (post: string) => {
    return {type: ADD_POST, post: post} as const
}
export const updatePostsReducerAC = (text: string) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text} as const
}
export const setUserProfileAC = (profile: ProfileResponseType) => {           //hacer type para profile
    return {type: SET_USER_PROFILE, profile} as const
}
//thunk

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
}
