import logo from '../../images/logo.png';
import logoBg from '../../images/logo-bg.png';
import header from './Header.module.scss'
import {NavLink} from 'react-router-dom';
import {HeaderContainerPropsType} from './HeaderContainer';
import {logoutTC} from '../../redux/auth-reducer';
import {useAppDispatch} from '../../redux/redux_store';
import exit from '../../images/exit.png';

type HeaderPropsType = HeaderContainerPropsType & {}

export function Header(props: HeaderPropsType) {

    const dispatch = useAppDispatch();
    const logOut = () => {
        dispatch(logoutTC());
    }

    return (
        <div className="container">
            <header className={header.inner}>
                <div>
                    <img
                        src={logo}
                        className={header.header_img_logo}
                        alt="logo"/>
                    <h1 className={header.title}>let's speak with everyone!!!</h1>
                </div>
                <img
                    src={logoBg}
                    className={header.header_img}
                    height="200"
                    alt="logo-bg"/>
            </header>

            <div className={header.panel_info}>
                <div className={header.panel_log}>{props.isAuth ? props.login :
                    <NavLink to={'/login'} className={header.login}>LogIn</NavLink>}</div>
                <div onClick={logOut} className={header.panel_logout}><img src={exit} alt='exit'/></div>
            </div>
        </div>
    )
}