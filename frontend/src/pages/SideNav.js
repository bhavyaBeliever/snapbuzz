import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { BsCameraReels } from "react-icons/bs";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaRegPlusSquare } from "react-icons/fa";
import { useAuthContext } from '../hooks/useAuthContext';

import logo from "../assets/logo.png"
import style from "../styles/SideNav.module.css"
import { MdLogout } from 'react-icons/md';

const SideNav = () => {
  const {dispatch}=useAuthContext();
  const location = useLocation()
  const pathName = location.pathname;
  const handleLogout = (e) =>{
    e.preventDefault();
    localStorage.removeItem("user");
    dispatch({type:'LOGOUT', payload:null});
    
  }

  return (
    <div className={style.sideNav}>
      <div className={style.sideNavLogo}>
        <img src={logo} alt="SnapBuzz" />
      </div>
      <div className={style.options}>
        <GoHome />
        <Link to="/">Home</Link>
      </div>
      <div className={style.options}>
        <GoSearch />
        <Link to="/" style={{ fontWeight: 'bold'}}>Search</Link>
      </div>
      <div className={style.options}>
        <BsCameraReels />
        <Link to="/">Reels</Link>
      </div>
      <div className={style.options}>
        <BiMessageRoundedDots />
        <Link to="/">Messages</Link>
      </div>
      <div className={style.options}>
        <FaRegPlusSquare />
        <Link to="/">Create</Link>
      </div>
      <div className={style.options}>
        <MdLogout />
        <Link to="/login" onClick={handleLogout} >Logout</Link>
      </div>
    </div>
  );
}

export default SideNav;