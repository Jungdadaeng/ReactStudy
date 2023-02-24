import './page.css'
import { Link } from "react-router-dom";
import Auth from '../components/Layout/Auth'
const Bpage = () => {
    return (
        <div >
            <div>
                <ul>
                    <li><Link to="/insta">인스타그램 프로젝트</Link></li>
                    <li>
                        <Link to="/sports">
                            스포츠 챌린지 프로젝트
                        </Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Bpage;