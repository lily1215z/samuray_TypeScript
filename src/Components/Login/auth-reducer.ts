import {Dispatch} from 'redux';


const initialState = {
    isLoggIn: false
}
type initialStateType = typeof initialState

export const authReducer = (state: initialStateType = initialState, action: authActionType): initialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGIN': {
            return {...state, isLoggIn: action.value}
        }

        default:
            return state
    }
}

//action creator
export const setIsLoggInAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGIN', value} as const
}

//type
type authActionType = ReturnType<typeof setIsLoggInAC>

//thunk
export const setIsLoggInTC = (data: any) => (dispatch: Dispatch) => {

}