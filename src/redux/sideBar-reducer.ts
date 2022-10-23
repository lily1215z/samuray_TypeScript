import {SideBarType} from './store';

export const initialState = {}

export const SideBarReducer = (state: SideBarType = initialState, action: SideBarActionType): SideBarType => {
    switch (action.type) {
        case 'ADD-SIDEBAR':
            return state

        default:
            return state
    }
}

//type
export type SideBarActionType = ReturnType<typeof sideBarReducerAC>

//action creator
export const sideBarReducerAC = (id: string, post: string) => {
    return {type: 'ADD-SIDEBAR', id: id, post: post} as const
}

//thunk