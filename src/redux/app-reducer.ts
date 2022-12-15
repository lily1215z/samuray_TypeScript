import {Dispatch} from 'redux';
import {AppThunk} from './redux_store';
import {getAuthMeTC} from './auth-reducer';
import {authAPI} from '../api/api';

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
            return {...state, initialized: action.initialized}

        default:
            return state
    }
}

//action creator
export const setInitializedAC = (initialized: boolean) => {
    return {type: SET_INITIALIZED, initialized} as const
}

//thunk
export const initializedAppTC = (): AppThunk => async (dispatch: Dispatch) => {
    // let promise = dispatch(getAuthMeTC())
    // await Promise.all([promise])
    // dispatch(setInitializedAC(true))
    try {
        const res = await authAPI.getAuthMe()
        if (res.data.resultCode === 0) {
            dispatch(getAuthMeTC())
        }
    } catch (e) {
        console.log(e)
    } finally {
        dispatch(setInitializedAC(true))
    }
}

//type
export type appReducerActionType = ReturnType<typeof setInitializedAC>
