import {Dispatch} from 'redux';

const initialState = {
    dialogs: [{id: 1, name: 'Svitlana'}, {id: 11, name: 'Javier'}, {id: 81, name: 'Kristina'}],
    messages: [{id: 2, message: 'Hi, lets start speak'}, {id: 22, message: 'Hola, si me gusta. Vamos hablar'}, {id: 23, message: 'Where do you live?'}]
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
export type DialogsActionType = ReturnType<typeof sendDialogsReducerAC>
export type MessagesType = {
    id: number, //было закоменчено id и оно не ругалось.
    message: string
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}