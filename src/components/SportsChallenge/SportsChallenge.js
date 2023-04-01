import { useNavigate } from 'react-router-dom'
import { React, useState } from 'react'
import {  useDispatch } from 'react-redux'
import confetti from 'canvas-confetti'
import './SportsChallenge.css'

const SportsChallenge = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const myCanvas = document.querySelector("canvas");
    const myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
    });

    const [recordCount, setRecordCount] = useState(0);

    const changeRecordCount = (addiCount) => {
        if (addiCount > 0) {
            myConfetti({
                particleCount: addiCount * 10,
                spread: 160
            });
        }

        const newRecordCount =
            recordCount + addiCount < 0 ? 0 : recordCount + addiCount;
        setRecordCount(newRecordCount);
    };
    const saveRecord = () => {
        if (recordCount == 0) return;
        dispatch({ type: 'save', payload: { recordcount: recordCount } })
        setRecordCount(0);
        navigate('/sports');
    };

    const cancelRecord = () => {
        setRecordCount(0);
        navigate('/sports');
    };



    return (
        <>
            <h1 className="font-bold text-xl">기록</h1>
            <div className="flex gap-2 items-center">
                <span> {String(recordCount).padStart(2, "0")}</span>
                <canvas id="confetti-canvas"></canvas>
                <button className="btn btn-primary" onClick={saveRecord}>적용</button>
                <button className="btn btn-primary" onClick={cancelRecord}>취소</button>
            </div>
            <div className="flex gap-2 mt-3">
                <button className="btn btn-primary" onClick={() => changeRecordCount(10)}>+ 10</button>
                <button className="btn btn-primary" onClick={() => changeRecordCount(5)}>+ 5</button>
                <button className="btn btn-primary" onClick={() => changeRecordCount(-10)}>- 10</button>
                <button className="btn btn-primary" onClick={() => changeRecordCount(-5)}>- 5</button>
            </div>
        </>
    )
}

export default SportsChallenge;