// import {v1} from 'uuid';

const initialState = {
    dialogs: [{id: 1, name: 'Svitlana'}, {id: 11, name: 'Alberto'}],
    messages: [{id: 2, message: 'Hi'}, {id: 22, message: 'Hola'}]
}

export const DialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionType): DialogsPageType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const newMessage = {
                id: 3,
                message: action.messages
            }
            return {...state, messages: [...state.messages, newMessage]}

        case 'UPDATE-NEW-MESSAGE-BODY':
            // return {...state, messages: action.body}
            // return {...state, messages: [...state.messages, {message: action.body}]}
            return <DialogsPageType>{...state, messages: [...state.messages, {message: action.body}]}  //добавила id в сообщения и оно ругается. Добавила таким образом типизацию и перестало
//lesson 48 - 27:00
        default:
            return state
    }
}

//type
export type DialogsActionType = ReturnType<typeof sendDialogsReducerAC> | ReturnType<typeof updateDialogsReducerAC>

//action creator
export const sendDialogsReducerAC = (messages: string) => {
    return {type: 'SEND-MESSAGE', messages: messages} as const
}

export const updateDialogsReducerAC = (body: string, id: number) => {
    return {type: 'UPDATE-NEW-MESSAGE-BODY', body: body, id} as const
}

//thunk

// type
export type DialogsType = {
    id: number,
    name: string
}

export type MessagesType = {
    id: number, //было закоменчено id и оно не ругалось.
    message: string
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}