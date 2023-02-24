import './SportsHeader.css'
import { Link, Outlet, NavLink, useLocation } from 'react-router-dom'
const SportsHeader = () => {
    return (
        <>
            <header className="sportsHeader">
                <ul className='menu'>
                    <Link to="/sports/history" className='menu-item'>HISTORY</Link>
                    <Link to="/sports" className='menu-item'>HOME</Link>
                </ul>
            </header>
            <Outlet />
        </>
    )
}

export default SportsHeader;