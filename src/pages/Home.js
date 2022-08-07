import axios from "axios";
import {useState} from "react";
import React from "react";
import Modal from '../compnents/Modal'
import {useSelector, useDispatch} from "react-redux";
import {getCurrentUserName} from "../store";
import kakao_login from "../assets/img/kakao_login_medium_narrow.png"

const Home = () => {

  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState('');

  const dispatch = useDispatch();

  let state = useSelector((state) => state)

  console.log(state.user)

  const openModal = (msg) => {
    setMessage(msg)
    setModal(true)
    setTimeout(() => setModal(false), 800);
  }

  const login = () => {
    axios.get('http://localhost:8080/currentUser')
      .then((res) => {
        console.log(res.data)
        dispatch(getCurrentUserName(res.data))

        setUserName(state.user)
        setShow(true)

        openModal("로그인 성공!!")
      })
      .catch(() => {
        openModal("로그인 실패 ㅠㅠ")
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

        setUserName('')
        setShow(false)

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
              show && <p className="hi">{state.user}님, 환영합니다!</p>
            }

              <p className="title">HILTON DESIGN</p>
              <p className="smallt">Hotel furniture</p>

            {
              show
              ? <div><button onClick={goToWork} className="btn end">출근하기!</button>
              <button onClick={getOffWork} className="btn end">퇴근하기!</button></div>
              : <a href={
                  'https://kauth.kakao.com/oauth/authorize?client_id=a33a6ac40ea15278b115b07b8250e8ea&redirect_uri=http://localhost:8080/auth/kakao/callback&response_type=code'
              }>
                  <img src={kakao_login} onClick={login} className="btn start" />
                </a>
            }
        </div>
      }
    </div>
  );
}

 
export default Home;