import logo from '../../images/logo.png';
import logoBg from '../../images/logo-bg.png';
import './Header.css'

export function Header() {
    return (
        <div className='container'>
            <header className="header__inner">
                <div>
                    <img
                        src={logo}
                        width='130'
                        alt="logo" />
                    <h1 className='header__title'>let's speak with everyone!!!</h1>
                </div>
                <img
                    src={logoBg}
                    height='200'
                    alt="logo-bg" />
            </header>
        </div>
    )
}