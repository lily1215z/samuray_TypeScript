import {Dispatch} from 'redux';
import {AppThunk} from './redux_store';
import {getAuthMeTC} from './auth-reducer';
import {authAPI} from '../api/api';
import axios from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../utils/object-helpers';

const SET_INITIALIZED = 'SET-SET_INITIALIZED';

const initialState = {
    initialized: false,
    error: '',
    preloader: false
}
// type appReducerType = typeof initialState;
type appReducerType = {
    initialized: boolean
    error: string | null
    preloader: boolean
}

export const AppReducer = (state: appReducerType = initialState, action: appReducerActionType): appReducerType => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {...state, initialized: action.initialized}

        case 'ALL_ERRORS': {
            return {...state, error: action.error}
        }

        case 'PRELOADER': {
            return {...state, preloader: action.preloader}
        }

        default:
            return state
    }
}

//action creator
export const setInitializedAC = (initialized: boolean) => {
    return {type: SET_INITIALIZED, initialized} as const
}
export const isErrorsAC = (error: string | null) => {
    return {type: 'ALL_ERRORS', error} as const
}
export const isPreloaderAC = (preloader: boolean) => {
    return {type: 'PRELOADER', preloader} as const
}

//thunk
export const initializedAppTC = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        dispatch(isPreloaderAC(true))
        const res = await authAPI.getAuthMe()
        if (res.data.resultCode === 0) {
            dispatch(getAuthMeTC())
        } else {
            handleServerAppError(res.data, dispatch) //ошибки наши
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)  //др ошибки
        }
    } finally {
        dispatch(setInitializedAC(true))
        dispatch(isPreloaderAC(false))
    }
}

//type
export type appReducerActionType = ReturnType<typeof setInitializedAC> | ReturnType<typeof isErrorsAC>
| ReturnType<typeof isPreloaderAC>
