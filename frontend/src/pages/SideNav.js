import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { BsCameraReels } from "react-icons/bs";
import { BiMessageRoundedDots } from "react-icons/bi";
import { FaRegPlusSquare } from "react-icons/fa";
import { useAuthContext } from '../hooks/useAuthContext';

import logo from "../assets/logo.png"
import style from "../styles/SideNav.module.css"
import { MdLogout } from 'react-icons/md';
import Search from '../components/Search';

const SideNav = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchbox, setSearchbox] = useState(false);
  const [usersInfo, setUsersInfo] = useState([]);
  const { dispatch } = useAuthContext();
  const location = useLocation()
  const pathName = location.pathname;
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    dispatch({ type: 'LOGOUT', payload: null });

  }
  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchbox(!searchbox);
    setIsExpanded(!isExpanded);
    

  }
 

  return (
    <div className={style.navbar}>
      {searchbox && (
        <div className={style.search}>
          <Search />
        </div>
      )}

      <div className={`${style.sideNav} ${isExpanded ? style.expanded : style.collapsed}`}>
        {
          isExpanded && (
            <div className={`${style.sideNavLogo} ${isExpanded ? style.expanded : style.collapsed}`}>
              <img src={logo} alt="SnapBuzz" />
            </div>
          )}
        <div className={style.list}>
          <div className={style.options}>
            <Link to="/" className={style.optionsLink}>
              <GoHome className={`${!isExpanded ? style.collapseIcon : style.expandIcon}`} style={{"fontSize": "40px"}}/>
              {isExpanded ? "Home" : ""}
            </Link>
          </div>
          <div className={style.options}>
            <Link to="/" className={style.optionsLink} onClick={handleSearch}>
              <GoSearch className={`${!isExpanded ? style.collapseIcon : style.expandIcon}`} style={{"fontSize": "40px"}}/>
              {isExpanded ? "Search" : ""}
            </Link>
          </div>
          <div className={style.options}>
            <Link to="/" className={style.optionsLink}>
              <BsCameraReels className={`${!isExpanded ? style.collapseIcon : style.expandIcon}`} style={{"fontSize": "40px"}}/>
              {isExpanded ? "Reels" : ""}
            </Link>
          </div>
          <div className={style.options}>
            <Link to="/" className={style.optionsLink}>
              <BiMessageRoundedDots className={`${!isExpanded ? style.collapseIcon : style.expandIcon}`} style={{"fontSize": "40px"}}/>
              {isExpanded ? "Messages" : ""}
            </Link>
          </div>
          <div className={style.options}>
            <Link to="/create" className={style.optionsLink}>
              <FaRegPlusSquare className={`${!isExpanded ? style.collapseIcon : style.expandIcon}`} style={{"fontSize": "40px"}}/>
              {isExpanded ? "Create" : ""}
            </Link>
          </div>
          <div className={style.options}>
            <Link to="/login" className={style.optionsLink} onClick={handleLogout} >
              <MdLogout className={`${!isExpanded ? style.collapseIcon : style.expandIcon}`} style={{"fontSize": "40px"}}/>
              {isExpanded ? "Logout" : ""}
            </Link>

          </div>

        <div className={style.options}>
          <Link to={`/${user.username}`} className={style.optionsLink}>
            
            Profile
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;