import { Link, Outlet, useLocation } from 'react-router-dom'
import { React, useState } from 'react'
import './SportsChallenge.css'
import confetti from 'canvas-confetti'
import Modal from 'react-modal';

const SportsChallenge = () => {
    const location = useLocation();

    console.log('ㅜㅜㅜㅜ', location);
    const goalCount = 10000;
    // const [doneCount, setDoneCount] = useRecoilState(doneCountAtom);
    const restCount = goalCount;
    const [addiCount, setAddiCount] = useState(0);

    const saveRecord = () => {
        // setDoneCount(doneCount + addiDoneCount);
    };
    const increaseAddiCount = (count) => {
        //  setAddiCount(doneCountaddiCount + count);
    };

    const decreaseAddiCount = (count) => {
        if (addiCount - count < 0) {
            setAddiCount(0);
        } else {
            setAddiCount(addiCount - count);
        }
    };

    const myCanvas = document.querySelector("canvas");
    const myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
    });

    function a() {
        myConfetti({
            particleCount: 100,
            spread: 360
        });
    }

    return (
        <>
            <h1 className="font-bold text-xl">기록</h1>
            <div className="flex gap-2 items-center">
                <span>{addiCount}</span>

                <canvas id="confetti-canvas"></canvas>
                <button onClick={a()}>클릭</button>
                <button className="btn btn-primary" onClick={saveRecord}>적용</button>
                <button className="btn btn-primary" >취소</button>
            </div>
            <div className="flex gap-2 mt-3">
                <button className="btn btn-primary" onClick={() => increaseAddiCount(10)}>+ 10</button>
                <button className="btn btn-primary" onClick={() => increaseAddiCount(1)}>+ 1</button>
                <button className="btn btn-primary" onClick={() => decreaseAddiCount(10)}>- 10</button>
                <button className="btn btn-primary" onClick={() => decreaseAddiCount(1)}>- 1</button>
            </div>
        </>
    )
}

export default SportsChallenge;