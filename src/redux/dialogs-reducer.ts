import {v1} from 'uuid';

const initialState = {
    dialogs: [{id: v1(), name: 'Svitlana'}, {id: v1(), name: 'Alberto'}],
    messages: [{id: v1(), message: 'Hi'}, {id: v1(), message: 'Hola'}]
}

export const DialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionType): DialogsPageType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            const newMessage = {
                id: v1(),
                message: action.messages
            }
            return {...state, messages: [...state.messages, newMessage]}

        case 'UPDATE-NEW-MESSAGE-BODY':
            // return {...state, messages: action.body}
            return {...state, messages: [...state.messages, {message: action.body}]}
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

export const updateDialogsReducerAC = (body: string) => {   //я убрала id от сюда и закоментила в типах. потом он понадобится
    return {type: 'UPDATE-NEW-MESSAGE-BODY', body: body} as const
}

//thunk

// type
export type DialogsType = {
    id: string,
    name: string
}

export type MessagesType = {
    // id: string,
    message: string
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}