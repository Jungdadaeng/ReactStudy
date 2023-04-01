import './page.css'
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import { useNavigate } from "react-router-dom";
// const { kakao } = window;
const Login = () => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const handleInputText = (e) => {
        setId(e.target.value);
        setPw(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (id === "") {
            alert("아이디를 입력해주세요.");
            return;
        }

        if (pw === "") {
            alert("비밀번호를 입력해주세요.");
            return;
        }
        localStorage.setItem("id", id);
        localStorage.setItem("pw", pw);

        navigate("/");
    };
    window.Kakao.init('1ea25ee84af7205c783789283935a024');

        function kakaoLogin() {
            window.Kakao.Auth.login({
                scope: 'nickname', //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
                success: function(response) {
                    console.log(response) // 로그인 성공하면 받아오는 데이터
                    window.Kakao.API.request({ // 사용자 정보 가져오기 
                        url: '/v2/user/me',
                        success: (res) => {
                            const kakao_account = res.kakao_account;
                            console.log(kakao_account)
                        }
                    });
                    navigate("/"); //리다이렉트 되는 코드
                },
                fail: function(error) {
                    console.log(error);
                }
            });
        }
    return (
        <div>
            <Helmet>
              <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=1ea25ee84af7205c783789283935a024" type="text/javascript" />
            </Helmet>
            <h3 className="name">Login</h3>
            <form className="login-form" method="post" onSubmit={handleLogin}>
                <label className="legend">아이디</label>
                <input name="id" type="text" vlaue={id} onChange={handleInputText} />
                <label className="legend">패스워드</label>
                <input name="pw" type="password" vlaue={pw} onChange={handleInputText} />
                {/* <input className='btn' type="button" value="로그인" /> */}
                <div className="find-btn">
                    <button type="submit" className="btn btn-navy navbar-btn find-btn1">로그인</button>
                </div>
                    <button onClick="kakaoLogin">
                        <span>카카오 로그인</span>
                    </button>
                    <button onClick="kakaoLogout">
                        <span>카카오 로그아웃</span>
                    </button>
            </form>
        </div>
    )
}

export default Login;