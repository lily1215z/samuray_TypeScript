import {Dispatch} from 'redux';
import {AppThunk} from './redux_store';
import {getAuthMeTC} from './auth-reducer';

const SET_INITIALIZED = 'SET-SET_INITIALIZED';

const initialState = {
    initialized: false
}
// type appReducerType = typeof initialState;
type appReducerType = {
    initialized: boolean
}

export const AppReducer = (state: appReducerType = initialState, action: appReducerActionType): appReducerType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, initialized: true}

        default:
            return state
    }
}

//action creator
export const setInitializedAC = () => {
    return {type: SET_INITIALIZED} as const
}

//thunk
export const initializedAppTC = (): AppThunk => (dispatch: Dispatch) => {

    let promise = dispatch(getAuthMeTC())
    Promise.all([promise])
        .then(() => {
            dispatch(setInitializedAC())
        })
}

//type
export type appReducerActionType = ReturnType<typeof setInitializedAC>
