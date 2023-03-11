import navbar from './NavBar.module.scss'
import {NavLink} from "react-router-dom";
import app from '../../App.module.scss';
import {useState} from 'react';

export function NavBar() {
    const [showBar, setShowBar] = useState( false);

    const isNavbarOpen = () => {
            setShowBar(!showBar)
    }

    const closePopUp = () => {
        setShowBar(false)
    }
    return (
        <nav className={navbar.navbar}>

            <span className={navbar.navbar_show} onClick={isNavbarOpen}></span>

            {
                showBar &&
                    <ul className={navbar.items}>
                        <li className={navbar.item}>
                            <NavLink to='/profile' onClick={closePopUp} className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Profile</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/users' onClick={closePopUp}  className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Users</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/dialogs' onClick={closePopUp}  className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Messages</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/news' onClick={closePopUp}  className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>News</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/music' onClick={closePopUp}  className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Music</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/settings' onClick={closePopUp}  className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Settings</NavLink></li>
                    </ul>
            }

        </nav>
    )
}
