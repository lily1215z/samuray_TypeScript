import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import {NavBar} from './Components/Navbar/NavBar';
import {Home} from './Components/Home/Home';
import UsersContainer from './Components/Users/UsersContainer';
import ProfileContainer from './Components/Profile/ProfileContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import {Login} from './Components/Login/Login';
import DialogContainer from './Components/Dialogs/DialogsContainer';

function App() {
    // const dispatch = useDispatch();
    // const dialogs = useSelector<AppRootStateType, Array<DialogsType>>(state => state.dialogsPage.dialogs)

    // const addMessages = (message: string) => {
    //     dispatch(sendDialogsReducerAC(message))
    // }

    return (
        <>
            <div className="App">
                <HeaderContainer />
                <div className="container">
                    <div className="app__inner">
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="profile/:userId" element={<ProfileContainer />}/>
                            <Route path="profile" element={<ProfileContainer />}/>
                            <Route path="dialogs/*" element={<DialogContainer />} />
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