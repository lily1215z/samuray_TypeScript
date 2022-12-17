import {Dispatch} from 'redux';
import {authAPI, LoginParamsType} from '../api/api';
import {AppThunk} from './redux_store';

const SET_USER_DATA = 'SET-USER-DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false  //отвечает за загрузилась крутилка или нет. Св-ва д/редиректа логина
}

export const AuthReducer = (state: authReducerType = initialState, action: authReducerActionType): authReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload, isAuth: action.payload.isAuth}

        default:
            return state
    }
}

//action creator
export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}} as const
}

//thunk
export const getAuthMeTC = (): any => async (dispatch: Dispatch) => {   //исправить any
    let res = await authAPI.getAuthMe()
    if (res.data.resultCode === 0) {
        let {id, email, login} = res.data.data               //деструктуризация
        dispatch(setAuthUserDataAC(id, email, login, true))
    }
}

export const loginTC = (dataForm: LoginParamsType): AppThunk => async (dispatch: Dispatch) => {
    let res = await authAPI.login(dataForm)
    if (res.data.resultCode === 0) {
        dispatch(getAuthMeTC())
    }
}

export const logoutTC = (): AppThunk => async (dispatch: Dispatch) => {
    console.log('asdf')
    const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserDataAC(null, null, null, false))
            }
}

//type
export type authReducerActionType = ReturnType<typeof setAuthUserDataAC>
// type authReducerType = typeof initialState;
type authReducerType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}