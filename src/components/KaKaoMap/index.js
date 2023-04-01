import { useEffect } from "react";
import { Helmet } from "react-helmet";


const KaKaoMap = () => {
/*global kakao*/
useEffect(() => {
    kakao.maps.load(() => {
      const container = document.getElementById('map'),
        options = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567), // 위도, 경도 입력
          level: 3,
          scrollwheel: true,
          draggable: true,
        };
      const map = new kakao.maps.Map(container, options); // 지도그리기
      const mapTypeControl = new kakao.maps.MapTypeControl();
    });
  });

   const mapStyle = {
    width: "100%",
    height: "500px"
   }
    return(
        <>
        <Helmet>
              <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1ea25ee84af7205c783789283935a024" type="text/javascript" />
        </Helmet>
            <h1>카카오맵 지도 연동</h1>
            <div id="map" style={mapStyle}></div>
        </>
    )
}

export default KaKaoMap;