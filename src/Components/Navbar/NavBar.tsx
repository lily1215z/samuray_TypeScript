import navbar from './NavBar.module.scss'
import {NavLink} from 'react-router-dom';
import app from '../../App.module.scss';
import {useEffect, useState} from 'react';

export function NavBar() {
    const [showBar, setShowBar] = useState(true);

    const isNavbarOpen = () => {
        setShowBar(!showBar)
    }

    useEffect(() => {
        if (window.innerWidth <= 700) {
            setShowBar(false)
        }
    }, [])

    const closePopUp = () => {
        if (window.innerWidth <= 700) {
            setShowBar(false)
        }
    }
    return (
        <nav className={navbar.navbar}>

            <span className={navbar.navbar_show} onClick={isNavbarOpen}></span>

            {
                showBar &&
                <ul className={navbar.items}>
                    <li className={navbar.item} onClick={closePopUp}>
                        <NavLink to="/profile"
                                 className={({isActive}) => (isActive ? `${app.active_nav}` : '')}>Profile</NavLink>
                    </li>

                    <li className={navbar.item} onClick={closePopUp}>
                        <NavLink to="/users"
                                 className={({isActive}) => (isActive ? `${app.active_nav}` : '')}>Users</NavLink></li>

                    <li className={navbar.item} onClick={closePopUp}>
                        <NavLink to="/dialogs"
                                 className={({isActive}) => (isActive ? `${app.active_nav}` : '')}>Messages</NavLink>
                    </li>

                    <li className={navbar.item} onClick={closePopUp}>
                        <NavLink to="/news"
                                 className={({isActive}) => (isActive ? `${app.active_nav}` : '')}>News</NavLink></li>

                    <li className={navbar.item} onClick={closePopUp}>
                        <NavLink to="/music"
                                 className={({isActive}) => (isActive ? `${app.active_nav}` : '')}>Music</NavLink></li>

                    <li className={navbar.item} onClick={closePopUp}>
                        <NavLink to="/settings"
                                 className={({isActive}) => (isActive ? `${app.active_nav}` : '')}>Settings</NavLink>
                    </li>
                </ul>
            }

        </nav>
    )
}
