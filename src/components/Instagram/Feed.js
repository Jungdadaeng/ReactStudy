import "./Feed.css";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import moreIcon from "./Images/more_horiz.svg";
import heartIcon from "./Images/heart.svg";
import chatIcon from "./Images/chat.svg";
import sendIcon from "./Images/send.svg";
import filledHeartIcom from "./Images/favorite_fill.svg";
import bookmarkIcon from "./Images/bookmark.svg";

const Feed = ({ username, location }) => {
  const [count, setCount] = useState(0);
  const [isFilled, setFilled] = useState(false);
  const onClick = () => {
    setFilled(true);
    setCount(count + 1);
  };

  return (
    <div className="feed">
      {/*header -> avatar + username*/}
      <div className="feed__header">
        <Avatar
          className="feed__avatar"
          alt=""
          src="static/images/avatar/1.png"
        />
        <div className="feed__headertxt">
          <h3>{username}</h3>
          <p>{location}</p>
        </div>
        <div className="feed__headermore">
          <img src={moreIcon} alt="" />
        </div>
      </div>

      {/*image*/}
      <img
        className="feed__image"
        alt=""
        src="https://i.pinimg.com/564x/b1/ad/96/b1ad96536679d576a9563b1ffe8831b3.jpg"
      />
      {/*heart+comment+save...*/}
      <div className="feed__buttons">
        <button onClick={onClick}>
          <img alt="" src={isFilled ? filledHeartIcom : heartIcon} />
        </button>
        <img alt="" src={chatIcon} />
        <img alt="" src={sendIcon} />
        <div className="bookmark">
          <img alt="" src={bookmarkIcon} />
        </div>
      </div>
      <div className="feed__text">
        <Avatar
          className="feed__avatar"
          alt=""
          src="static/images/avatar/1.png"
        />
        <h3>{username}</h3> 님 외 {count}명이 좋아합니다.
      </div>
      {/*username+caption*/}
      <div className="feed__text2">
        <h3>{username}</h3> &nbsp; 집이 최고 홈 스윗 홈{" "}
        <div className="lightFont">...더 보기</div>
      </div>
      <p className="lightFont2"> 댓글 모두 보기</p>
      <h4 className="feed__comment">
        <strong>adfk</strong> Wow so cute
      </h4>
      <h4 className="feed__comment">
        <strong>ggsg</strong> 아늑해보인다
      </h4>
      <h4 className="feed__comment">
        <strong>jane</strong> ㅎㅎ
      </h4>
      <h4 className="feed__comment">
        <strong>ff_fff</strong> 미피 카와이 :)
      </h4>
      <hr className="line" />
      <div className="sendComment">
        <input type="text" placeholder="댓글 달기...." />
        <button className="sendBtn">게시</button>
      </div>
    </div>
  );
};

export default Feed;
