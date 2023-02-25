import { Route, Routes, Link } from 'react-router-dom'
import './SportsMain.css'
import Header from './SportsHeader.js'
import Layout from './SportsLayout'
import Main from './SportsMain'
import History from './SportsHistory'
import Challenge from './SportsChallenge'
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
const SportsMain = () => {
    // const [goalCount, setGoalCount] = useState(10000);
    const goalCount = useSelector((state) => state.goalcount);
    //const [doneCount, setDoneCount] = useState(0);
    const doneCount = useSelector((state) => state.donecount);
    const restCount = goalCount - doneCount;

    return (
        <>
            <Routes>
                <Route element={<Header />}>
                    <Route path='/sports' element={<Main />} />
                    <Route path='/sports/history' element={<History />} />
                    <Route path='/sports/challenge' element={<Challenge />} />
                </Route>
            </Routes>
            <div>

                <h2 className="title">Sports Challenge</h2>
                <div>
                    <span> 스쿼트 누적 개수</span>
                    <br />
                    <div>남은횟수 : {restCount}회</div>
                    <div>수행횟수 : {doneCount}회</div>
                    <br />
                    <Link to={{ pathname: '/sports/challenge' }}>스쿼트 실행</Link>
                </div>
            </div>
        </>
    )
}

export default SportsMain;