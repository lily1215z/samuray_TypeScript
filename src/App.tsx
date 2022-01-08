import React from 'react';
import './App.css';
import {Header} from "./Components/Header/Header";
import {NavBar} from "./Components/Navbar/NavBar";
import {Profile} from "./Components/Profile/Profile";
// import {BrowserRouter, Route, Router} from "react-router-dom";
// import {BrowserRouter as Router, Route} from "react-router-dom";


// const routes = [
//     {
//         path: "/profile",
//         component: Profile
//     },
//     {
//         path: "/messages",
//         component: Messages
//     }
// ];
export type dataTypeProps = {
    id: number,
    img: string,
    like: number,
    post: string
}

function App() {
    const data:Array<dataTypeProps> = [
        {id:1, post:'hello. my dear friend', img: 'https://cspromogame.ru//storage/upload_images/avatars/4202.jpg', like: 5},
        {id:2, post:'Lets go to in skyUp.', img: 'https://cspromogame.ru//storage/upload_images/avatars/4166.jpg', like: 15},
        {id:3, post:'True or false: hard question.', img: 'https://cspromogame.ru//storage/upload_images/avatars/4275.jpg', like: 16},
        {id:4, post:'We go to in other country', img: 'https://cspromogame.ru//storage/upload_images/avatars/4202.jpg', like: 8}
    ]

    return (
        <>
            {/*<Router/>*/}
            <div className="App">
                <Header/>
                <div className='container'>
                    <div className="app__inner">
                        <NavBar/>
                        {/*<Route path='/profile' />*/}
                        {/*<Route path='/messages'/>*/}
                        {/*<Route path='/news'/>*/}
                        {/*<Route path='/music'/>*/}
                        {/*<Route path='/settings'/>*/}
                        <Profile data={data} />
                    </div>
                </div>
            </div>
            {/*<Router/>*/}
        </>
    );
}

export default App;