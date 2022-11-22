import logo from '../../images/logo.png';
import logoBg from '../../images/logo-bg.png';
import header from './Header.module.css'
import {NavLink} from 'react-router-dom';
import {HeaderContainerPropsType} from './HeaderContainer';

type HeaderPropsType = HeaderContainerPropsType & {}
export function Header(props: HeaderPropsType) {
    console.log(props)
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
            <div>
                {props.isAuth ? props.login : <NavLink to={'/login'} >Login</NavLink>}
            </div>
        </div>
    )
}