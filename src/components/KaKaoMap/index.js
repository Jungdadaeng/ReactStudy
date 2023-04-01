import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { markerdata } from "./data/markerData";

const KaKaoMap = () => {
/*global kakao*/
useEffect(() => {
    kakao.maps.load(() => {
      const container = document.getElementById('map'),
        options = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567), // 위도, 경도 입력
          level: 5,
          scrollwheel: true,
          draggable: true,
        };
      const map = new kakao.maps.Map(container, options); // 지도그리기
      const mapTypeControl = new kakao.maps.MapTypeControl();
      var markerPosition  = new kakao.maps.LatLng(37.566826, 126.9786567); 

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
          position: markerPosition
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);

      // markerdata.forEach((el)=>{
      //   new kakao.maps.Marker({
      //     //마커가 표시 될 지도
      //     map: map,
      //     //마커가 표시 될 위치
      //     position: new kakao.maps.LatLng(el.lat, el.lng),
      //     //마커에 hover시 나타날 title
      //     title: el.title,
      //   });
      // })
    });
  });

  const Wrapper = {
    flex: "column"
  }

  const mapStyle = {
    width: "80%",
    height: "1000px",
  }

  const onClickMarker = (event, id) => {
    console.log(id)
    let lat = '';
    let lng = '';
     markerdata.map((data)=>{
      if(data.id === id){
        lat = data.lat;
        lng = data.lng;
      }
    })
    console.log(lat, lng)
    const container = document.getElementById('map'),
    options = {
      center: new kakao.maps.LatLng(lat, lng), // 위도, 경도 입력
      level: 3,
      scrollwheel: true,
      draggable: true,
    };
    const map = new kakao.maps.Map(container, options); // 지도그리기
    var markerPosition  = new kakao.maps.LatLng(lat, lng); 

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
        position: markerPosition
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
   
  }

    return(
        <>
        <Helmet>
              <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1ea25ee84af7205c783789283935a024" type="text/javascript" />
        </Helmet>
        <div style={Wrapper}>
            <h1>카카오맵 지도 연동</h1>
            <h1>위치 찾기 :<input type="text"></input></h1>
            <ol>
              {markerdata.map((data)=>{
                return ( <li key={data.id}><button onClick={(e)=>onClickMarker(e, data.id)} >{data.title}</button></li>)
              })}
              
            </ol>
            <div id="map" style={mapStyle}>
            </div>
         </div>
        </>
    )
}

export default KaKaoMap;