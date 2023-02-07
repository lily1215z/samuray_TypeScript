import navbar from './NavBar.module.scss'
import {NavLink} from "react-router-dom";
import app from '../../App.module.scss';
import {useState} from 'react';

export function NavBar() {
    const [showBar, setShowBar] = useState( true);

    const isNavbarOpen = () => {
            setShowBar(!showBar)
    }

    return (
        <nav className={navbar.navbar}>

            <span className={navbar.navbar_show} onClick={isNavbarOpen}></span>

            {
                showBar &&
                    <ul className={navbar.items}>
                        <li className={navbar.item}>
                            <NavLink to='/profile' className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Profile</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/users' className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>users</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/dialogs' className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Messages</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/news' className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>News</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/music' className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Music</NavLink></li>

                        <li className={navbar.item}>
                            <NavLink to='/settings' className={({ isActive }) =>(isActive ? `${app.active_nav}` : "")}>Settings</NavLink></li>
                    </ul>
            }

        </nav>
    )
}
