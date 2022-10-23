import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import {Header} from "./Components/Header/Header";
import {NavBar} from "./Components/Navbar/NavBar";
import {Profile} from "./Components/Profile/Profile";
import {Dialogs} from "./Components/Dialogs/Dialogs";
import {Home} from "./Components/Home/Home";
import {DialogsType, MessagesType, PostsType} from "./redux/store";
import { AppRootStateType } from './redux/redux_store';
import {useDispatch, useSelector} from "react-redux";
import {postsReducerAC} from "./redux/posts-reducer";


// type AppType = {
//     state: AppRootStateType
// }

function App() {
    // let posts = props.state.profilePage.posts
    // let dialogs = props.state.dialogsPage.dialogs
    // let messages = props.state.dialogsPage.messages

    const dispatch = useDispatch();
    const posts = useSelector<AppRootStateType, Array<PostsType>>(state => state.profilePage.posts)
    const dialogs = useSelector<AppRootStateType, Array<DialogsType>>(state => state.dialogsPage.dialogs)
    const messages = useSelector<AppRootStateType, Array<MessagesType>>(state => state.dialogsPage.messages)

    const [postsList, setPostsList] = useState<Array<PostsType>>(posts)

    const addPost = (post: string) => {        //добавляем посты в профайле
        // const newPost = {id: v1(), post: post, img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png', like: 5}
        // const updatePosts = [newPost, ...postsList]
        // setPostsList(updatePosts)
        dispatch(postsReducerAC(post))
    }

    return (
        <>
            <div className="App">
                <Header/>
                <div className='container'>
                    <div className="app__inner">
                        <NavBar/>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='profile' element={<Profile posts={postsList} addPost={addPost} />} />
                            <Route path='dialogs/*' element={<Dialogs dialogs={dialogs} messages={messages}/>}/>
                            <Route path='news'/>
                            <Route path='music'/>
                            <Route path='settings'/>
                        </Routes>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;