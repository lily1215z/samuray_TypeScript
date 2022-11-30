import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {DialogsActionType, DialogsReducer} from './dialogs-reducer';
import {PostsReducerActionType, ProfileReducer} from './posts-reducer';
import {SideBarActionType, SideBarReducer} from './sideBar-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {UsersActionType, UsersReducer} from './users-reducer';
import {AuthReducer, authReducerActionType} from './auth-reducer';
import {AppReducer, appReducerActionType} from './app-reducer';


const rootReducer = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer,
    sidebar: SideBarReducer,
    users: UsersReducer,
    auth: AuthReducer,
    app: AppReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppActionType = PostsReducerActionType | DialogsActionType | SideBarActionType | UsersActionType
| authReducerActionType | appReducerActionType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionType>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType>=useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()



//@ts-ignore
window.store = store
