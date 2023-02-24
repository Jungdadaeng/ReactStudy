import "./Instagram.css";
import Feed from "./Feed";
function Instagram() {
  return (
    <div className="app">
      {/*Header*/}
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {/*Feed*/}
      <Feed username="dyjung" location="home sweet home" />
      {/*Feed*/}
    </div>
  );
}

export default Instagram;
