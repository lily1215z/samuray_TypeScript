

import {Dispatch} from 'redux';

const initialState = {
    dialogs: [{id: 1, name: 'Svitlana'}, {id: 11, name: 'Javier'}],
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

        default:
            return state
    }
}

//type
export type DialogsActionType = ReturnType<typeof sendDialogsReducerAC>

//action creator
export const sendDialogsReducerAC = (messages: string) => {
    return {type: 'SEND-MESSAGE', messages: messages} as const
}


//thunk
export const sendDialogsReducerTC = (messages: string) => (dispatch: Dispatch) => {

}


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