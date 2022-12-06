import logo from '../../images/logo.png';
import logoBg from '../../images/logo-bg.png';
import header from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {HeaderContainerPropsType} from './HeaderContainer';

type HeaderPropsType = HeaderContainerPropsType & {}
export function Header(props: HeaderPropsType) {
    return (
        <div className='container'>
            <header className={header.inner}>
                <div>
                    <img
                        src={logo}
                        width='130'
                        alt="logo" />
                    <h1 className={header.title}>let's speak with everyone!!!</h1>
                </div>
                <img
                    src={logoBg}
                    height='200'
                    alt="logo-bg" />
            </header>
            <div className={header.panel_info}>
                <div className={header.panel_log}>{props.isAuth ? props.login : <NavLink to={'/login'} className={header.login}>LogIn</NavLink>}</div>
                {/*<div className={header.panel_log}>LogOut</div>*/}
                <div>LogOut</div>
            </div>
        </div>
    )
}