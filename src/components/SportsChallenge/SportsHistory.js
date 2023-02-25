import './SportsHistory.css'
import { useSelector, useDispatch } from 'react-redux'

const SportsHistory = () => {
    const history = useSelector((state) => state.history);
    const dispatch = useDispatch();
    const removeHistory = (index) => {
        dispatch({ type: 'remove', payload: { index: index } })
    }
    return (
        <div>
            <h1 className="title">Challenge History</h1>
            {history.map((count, index) => {
                return (
                    <div key={index}>
                        <span>{`${count}회 실행`}</span> <button onClick={() => removeHistory(index)}>기록삭제</button>  <br />
                    </div>
                )
            })}
        </div>
    )
}

export default SportsHistory;
