import './Sidebar.css'
import { Outlet } from 'react-router-dom'
import { Link, NavLink, useLocation } from "react-router-dom";
import db from '../../db/data.json';
const Sidebar = () => {
    const active = useLocation().pathname.replace('/', '');
    let contents = db.contents;
    return (
        <div className="container">
            <section className="box">
                <aside className="box-sidebar">
                    {
                        db.contents.map((data) => {
                            return (
                                <div key={data.id}>
                                    <Link to={`/${data.content}`} style={{ textDecoration: "none", color: `${(active === '' ? 'A' : active) === data.content ? 'dodgerblue' : 'black'}` }}>
                                        <p>{`${data.title}`}</p>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </aside>
                <div className="box-contents">
                    <Outlet />
                </div>
            </section>
        </div >
    )
}

export default Sidebar;