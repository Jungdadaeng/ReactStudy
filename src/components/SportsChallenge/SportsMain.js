import { Route, Routes, Link } from 'react-router-dom'
import './SportsMain.css'
import Header from './SportsHeader.js'
import Layout from './SportsLayout'
import Main from './SportsMain'
import History from './SportsHistory'
import Challenge from './SportsChallenge'
import React, { useState } from 'react';

const SportsMain = () => {
    const [goalCount, setGoalCount] = useState(10000);
    const [doneCount, setDoneCount] = useState(0);
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
                <body>
                    <span> 스쿼트 누적 개수</span>
                    <br />
                    <div>남은횟수 : {(restCount)}회</div>
                    <div>수행횟수 : {(doneCount)}회</div>
                    <br />
                    <Link to={{ pathname: '/sports/challenge', state: { Count: doneCount } }}>스쿼트 실행</Link>
                </body>
            </div>
        </>
    )
}

export default SportsMain;