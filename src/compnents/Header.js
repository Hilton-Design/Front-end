import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import Modal from "./Modal";
import {useDispatch, useSelector} from "react-redux";
import {setIsLogin, toggleModal} from "../store";

const Header = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const modal = useSelector(state => state.modal)

  const openModal = (msg) => {
    setMessage(msg)
    dispatch(toggleModal(false))
    setTimeout(() => toggleModal(true), 1000);
  }

  const logout = () => {
    axios.delete("http://localhost:8080/auth")
      .then(() => {
        dispatch(setIsLogin(false));
        openModal("로그아웃 성공");
      })
      .catch(() => {
        openModal("로그아웃 실패");
      })
  }


  return (
    modal
      ? <Modal message={message}/>
      :
      <div className="top-nav">
        <div>
          <Link to='/'>Home</Link>
          <Link to='/commute'>Commute</Link>
          <Link to='/error'>For check error</Link>
        </div>
        <div>
          <Link to='/login'>Login</Link>
          <Link to='/signUp'>Sign up</Link>
          <Link onClick={logout} to='/'>Log out</Link>
        </div>
    </div>
  );
}
 
export default Header;