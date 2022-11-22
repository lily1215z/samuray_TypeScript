const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UN-FOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

export type UserType = {
    id: number,
    name: string,
    status: string,
    photos: {
        small: string,
        large: string
    },
    followed: boolean
}

const initialState = {
    users: [],
    pageSize: 2,
    totalUsersCount: 0,
    currentPage: 1,   //со старта будет 1 страница. всегда будем запрашивать 1 стр
    isFetching: false,
    followingInProgress: false
}

export type UsersPageType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: boolean
}

export const UsersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            // return {...state, users: [...state.users.map((i: any )=> i.userId === action.userId ? i.followed === true : i)]}

            //нужно сделать копию самого обьекта в кот меняем. выше пример там напрямую мутирую обьект - плохо. внизу - верно
            return {
                ...state,
                users: [...state.users.map((i: any) => i.userId === action.userId ? {...i, followed: true} : i)]
            }

        case UNFOLLOW:
            return {
                ...state,
                users: [...state.users.map((i: any) => i.userId === action.userId ? {...i, followed: false} : i)]
            }

        case SET_USERS:
            // return {...state, users: action.users}
            return {...state, users: [...action.users, ...state.users]}  //склеиваем старый state с новым 49lesson 34 min

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageNumber}

        case SET_USERS_TOTAL_COUNT:
            return {...state, totalUsersCount: action.totalCount}

        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.toggle}

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {...state, followingInProgress: action.toggle}

        default:
            return state
    }
};

export const followAC = (userId: number) => ({type: FOLLOW, userId} as const)
export const unFollowAC = (userId: number) => ({type: UNFOLLOW, userId} as const)
export const setUsersAC = (users: Array<UserType>) => ({type: SET_USERS, users} as const)
export const setCurrentPageAC = (pageNumber: number) => ({type: SET_CURRENT_PAGE, pageNumber} as const)
export const setUsersTotalCountAC = (totalCount: number) => ({type: SET_USERS_TOTAL_COUNT, totalCount} as const)
export const toggleIsFetchingAC = (toggle: boolean) => ({type: TOGGLE_IS_FETCHING, toggle} as const)
export const toggleIsFollowingProgressAC = (toggle: boolean) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, toggle} as const)

export type UsersActionType = ReturnType<typeof followAC> | ReturnType<typeof unFollowAC>
    | ReturnType<typeof setUsersAC> | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setUsersTotalCountAC> | ReturnType<typeof toggleIsFetchingAC>
    | ReturnType<typeof toggleIsFollowingProgressAC>