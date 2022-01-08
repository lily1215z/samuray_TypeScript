import './NavBar.css'

export function NavBar() {
    return (
        <div className='navbar'>
            <ul className='navbar__items'>
                <li className='navbar__item'><a href='#'>Profile</a></li>
                <li className='navbar__item'><a href='#'>Messages</a></li>
                <li className='navbar__item'><a href='#'>News</a></li>
                <li className='navbar__item'><a href='#'>Music</a></li>
                <li className='navbar__item'><a href='#'>Settings</a></li>
            </ul>
        </div>
    )
}