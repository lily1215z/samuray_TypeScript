import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import {NavBar} from './Components/Navbar/NavBar';
import {Dialogs} from './Components/Dialogs/Dialogs';
import {Home} from './Components/Home/Home';
import {AppRootStateType} from './redux/redux_store';
import {useDispatch, useSelector} from 'react-redux';
import {addPostsReducerAC} from './redux/posts-reducer';
import {DialogsType, sendDialogsReducerAC} from './redux/dialogs-reducer';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import {Login} from './Components/Login/Login';

function App() {
    const dispatch = useDispatch();
    const dialogs = useSelector<AppRootStateType, Array<DialogsType>>(state => state.dialogsPage.dialogs)

    const addPost = (post: string) => {        //добавляем посты в профайле
        dispatch(addPostsReducerAC(post))
    }
    const addMessages = (message: string) => {
        dispatch(sendDialogsReducerAC(message))
    }

    return (
        <>
            <div className="App">
                <HeaderContainer />
                <div className="container">
                    <div className="app__inner">
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="profile/:userId" element={<ProfileContainer addPost={addPost}/>}/>
                            <Route path="profile" element={<ProfileContainer addPost={addPost}/>}/>
                            <Route path="dialogs/*" element={<Dialogs addMessage={addMessages} dialogs={dialogs}/>} />
                            <Route path="news" element={<div>news</div>}/>
                            <Route path="music" element={<div>music</div>}/>
                            <Route path="settings" element={<div>settings</div>}/>
                            <Route path="users" element={<UsersContainer/>}/>
                            <Route path="*" element={<div>Route not match</div>}/>
                            <Route path="login" element={<Login />}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;