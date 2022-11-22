

const SET_USER_DATA = 'SET-USER-DATA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false  //отвечает за загрузилась крутилка или нет
}

export const AuthReducer = (state = initialState, action: any): any => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true}


        default:
            return state
    }
}

//action creator
export const setAuthUserDataAC = (userId: number, email: string, login: string) => {
    return {type: SET_USER_DATA, data: {userId, email, login}} as const
}