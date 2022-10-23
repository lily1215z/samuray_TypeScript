import logo from '../../images/logo.png';
import logoBg from '../../images/logo-bg.png';
import header from './Header.module.css'

export function Header() {
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
        </div>
    )
}