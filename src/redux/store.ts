import {v1} from 'uuid'
import { AppRootStateType } from './redux_store'

export type PostsType = {
    id: string
    post: string
    img: string
    like: number
}
export type DialogsType = {
    id: string,
    name: string
}
export type MessagesType = {
    id: string,
    message: string
}

export type ProfilePageType = {
    posts: Array<PostsType>
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}

export type SideBarType = {}

// export type RootStateType = {
//     profilePage: ProfilePageType
//     dialogsPage: DialogsPageType
//     sidebar: SideBarType
// }

const store: AppRootStateType = {
    profilePage: {
        posts: [
            {
                id: v1(),
                post: 'hello, my dear friend',
                img: 'https://cspromogame.ru//storage/upload_images/avatars/4202.jpg',
                like: 5
            },
            {
                id: v1(),
                post: 'Lets go to in skyUp.',
                img: 'https://cspromogame.ru//storage/upload_images/avatars/4166.jpg',
                like: 15
            },
            {
                id: v1(),
                post: 'True or false: hard question.',
                img: 'https://cspromogame.ru//storage/upload_images/avatars/4275.jpg',
                like: 16
            },
            {
                id: v1(),
                post: 'We go to in other country',
                img: 'https://cspromogame.ru//storage/upload_images/avatars/4202.jpg',
                like: 8
            }
        ]
    },
    dialogsPage: {
        dialogs: [
            {id: v1(), name: 'Svitlana'},
            {id: v1(), name: 'Vlad'},
            {id: v1(), name: 'Lana'},
            {id: v1(), name: 'Nata'},
            {id: v1(), name: 'Valera'},
            {id: v1(), name: 'Alex'}
        ],
        messages: [
            {id: v1(), message: 'Hi'},
            {id: v1(), message: 'Hello'},
            {id: v1(), message: 'hello, my dear friend )))))'},
            {id: v1(), message: 'How is your it-camasutra?'},
            {id: v1(), message: 'Nice to me you hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend hello, my dear friend ))))'},
        ]
    },
    sidebar: {},
}

export default store