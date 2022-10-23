import {ProfilePageType} from './store';
import {v1} from 'uuid';

const initialState = {
    posts: [
        {
            id: v1(),
            post: 'hello, my dear friend',
            img: 'https://cspromogame.ru//storage/upload_images/avatars/4202.jpg',
            like: 5
        },
    ]
}

export const ProfileReducer = (state: ProfilePageType = initialState, action: PostsReducerActionType): ProfilePageType => {
// export const ProfileReducer = (state: Array<PostsType> = initialState, action: ActionType): Array<PostsType> => {
    switch (action.type) {
        case 'ADD-POST':
            // return [...state,
            // {id: v1(),
            //     post: action.post,
            //     img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png',
            //     like: 5}
            // ]

            const newPost = {
                id: v1(),
                post: action.post,
                img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png',
                like: 5
            }
            // return [newPost, ...state]  // может здесь обьект пока вернут просто стейт чтоб убрать ошибку
            return state
        // return updatePosts;

        default:
            return state;
    }
}

//type
export type PostsReducerActionType = ReturnType<typeof postsReducerAC>

//action creator
export const postsReducerAC = (post: string) => {
    return {type: 'ADD-POST', post: post} as const
}

//thunk