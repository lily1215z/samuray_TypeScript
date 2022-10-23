import {DialogsPageType} from './store';
import {v1} from 'uuid';

const initialState = {
    dialogs: [{id: v1(), name: 'Svitlana'}],
    messages: [{id: v1(), message: 'Hi'}]
}


export const DialogsReducer = (state: DialogsPageType = initialState, action: DialogsActionType): DialogsPageType => {
    switch (action.type) {
        case 'ADD-DIALOGS':
            return state;

        default:
            return state
    }
}

//type
export type DialogsActionType = ReturnType<typeof dialogsReducerAC>

//action creator
export const dialogsReducerAC = (id: string, messages: string) => {
    return {type: 'ADD-DIALOGS', id: id, messages: messages} as const
}

//thunk