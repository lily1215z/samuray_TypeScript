import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux';
import {DialogsActionType, DialogsReducer} from './dialogs-reducer';
import {PostsReducerActionType, ProfileReducer} from './posts-reducer';
import {SideBarActionType, SideBarReducer} from './sideBar-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';


const rootReducer = combineReducers({
    profilePage: ProfileReducer,
    dialogsPage: DialogsReducer,
    sidebar: SideBarReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionType>
export type AppActionType = PostsReducerActionType | DialogsActionType | SideBarActionType

export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionType>

//@ts-ignore
window.store = store
