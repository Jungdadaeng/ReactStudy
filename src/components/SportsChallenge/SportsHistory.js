import './SportsHistory.css'
import { useSelector, useDispatch } from 'react-redux'

const SportsHistory = () => {
    const history = useSelector((state) => state.history);
    return (
        <div>
            {history.map((count, index) => {
                return (
                    <>
                        <h2 className="title">Challenge History</h2>
                        <div key={index}>
                            <span >{`${count}회 실행`}</span>   <br />
                        </div>

                    </>
                )
            })}
        </div>
    )
}

export default SportsHistory;