import {Dispatch} from 'redux';
import {authAPI, LoginParamsType, securityAPI} from '../api/api';
import {AppThunk} from './redux_store';
import axios from 'axios';
import {handleServerAppError, handleServerNetworkError} from '../utils/object-helpers';

const SET_USER_DATA = 'SET-USER-DATA';
const GET_CAPTCHA_URL = 'GET-CAPTCHA-URL';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,  //отвечает за загрузилась крутилка или нет. Св-ва д/редиректа логина
    captchaUrl: null  //if null then captcha is not required
}

export const AuthReducer = (state: authReducerType = initialState, action: authReducerActionType): authReducerType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload, isAuth: action.payload.isAuth}

        // case GET_CAPTCHA_URL: {   //в каптче нет поле ввода. Не стала его доделывать. он не нужен в проекте
            // return {...state, ...action.payload}  //or
            // return {...state, ...action.payload, captchaUrl: action.payload.captcha}
        // }

        default:
            return state
    }
}

//action creator
export const setAuthUserDataAC = (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}} as const
}
export const getCaptchaUrlAC = (captcha: string) => {
    return {type: GET_CAPTCHA_URL, payload: {captcha}} as const
}

//thunk
export const getAuthMeTC = (): any => async (dispatch: Dispatch) => {   //исправить any
    try {
        const res = await authAPI.getAuthMe()
        if (res.data.resultCode === 0) {
            let {id, email, login} = res.data.data               //деструктуризация
            dispatch(setAuthUserDataAC(id, email, login, true))
        } else {
            handleServerAppError(res.data, dispatch) //ошибки наши
        }
    } catch(e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)  //др ошибки
        }
    }

}

export const loginTC = (dataForm: LoginParamsType): AppThunk => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.login(dataForm)
        if (res.data.resultCode === 0) {
            dispatch(getAuthMeTC())
        } else {
            handleServerAppError(res.data, dispatch)
            // const message = res.data.messages.length > 0 ? res.data.messages[0] : 'some error';
            if(res.data.resultCode === 10) {  //error is wrong
                // @ts-ignore
                dispatch(getCaptchaUrlTC())
            }
        }
    } catch(e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)  //др ошибки
        }
    }

}

export const getCaptchaUrlTC = () => async (dispatch: Dispatch) => {
    const res = await securityAPI.getCaptchaUrl();
    const captchaUrl = res.data.url;
    dispatch(getCaptchaUrlAC(captchaUrl));
}

export const logoutTC = (): AppThunk => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAuthUserDataAC(null, null, null, false))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            handleServerNetworkError(e, dispatch)
        }
    }
}

//type
export type authReducerActionType = ReturnType<typeof setAuthUserDataAC> | ReturnType<typeof getCaptchaUrlAC>
// type authReducerType = typeof initialState;
type authReducerType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null
}