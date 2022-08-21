import axios from "axios";
import React, {useState} from "react";
import Modal from '../compnents/Modal'
import {useDispatch, useSelector} from "react-redux";
import {setIsLogin, setUsername, setAccessToken, setRefreshToken} from "../store";

const Home = () => {

  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const username = useSelector(state => state.username);
  const isLogin = useSelector(state => state.isLogin);
  const accessToken = useSelector(state => state.jwtToken.accessToken);
  const refreshToken = useSelector(state => state.jwtToken.refreshToken);

  console.log("isLogin : " + isLogin)
  console.log("username : " + username)
  console.log("accessToken : " + accessToken)
  console.log("refreshToken : " + refreshToken)

  const openModal = (msg) => {
    setMessage(msg)
    setModal(true)
    setTimeout(() => setModal(false), 1000);
  }

  const login = () => {
    axios.post("http://localhost:8080/auth",  {
        email: "test@mail.com",
        password: "test"
    })
      .then((res) => {
          openModal("로그인 성공!!!!");
          console.log(res.data);
          dispatch(setIsLogin(true));
          dispatch(setAccessToken(res.data.accessToken));
          dispatch(setRefreshToken(res.data.refreshToken));
          getCurrentUser();
      })
      .catch(() => {
        openModal("로그인 실패")
      })
  }

  const getCurrentUser = () => {
    axios.get("http://localhost:8080/user/currentUser", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Refresh-Token":refreshToken
      }
    })
      .then((res) => {
        console.log(res.data)
        dispatch(setUsername(res.data))

        openModal("유저 성공!!")
      })
      .catch(() => {
        openModal("유저 실패 ㅠㅠ")
      })
  }

  const goToWork = () => {
    axios.post("http://localhost:8080/go-to-work")
      .then(() => {
        openModal("출근 완료! 빡시게 일해보자!")
      })
      .catch(() => {
        openModal("출근 실패.. 이대로 집가시면.. 안됩니다!")
      })
  }

  const getOffWork = () => {
    axios.post("http://localhost:8080/get-off-work")
      .then(() => {
        console.log("퇴근 성공!")

        dispatch(setIsLogin(false));

        openModal("퇴근 완료! 집가서 푹~ 쉽시다!")
      })
      .catch(() => {
        openModal("퇴근 실패 ㅠ 오늘 야근인가?")
      })
  }

  return (
    <div className="container">
      {
        modal
          ? <Modal message={message}/>
          : <div>
            {
              isLogin && <p className="hi">{username}님, 환영합니다!</p>
            }

              <p className="title">HILTON DESIGN</p>
              <p className="smallt">Hotel furniture</p>

            <h1>{isLogin}</h1>
            {
              isLogin
                ? <div>
                  <button onClick={goToWork} className="btn end">출근하기!</button>
                  <button onClick={getOffWork} className="btn end">퇴근하기!</button>
                </div>

                : <button onClick={login} className="btn start" >LOGIN</button>
            }
        </div>
      }
    </div>
  );
}

 
export default Home;