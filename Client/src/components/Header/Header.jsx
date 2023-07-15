import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { UserAPI } from "../../api/userApiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Header = () => {
  const userLogin = JSON.parse(localStorage.getItem('userLogin')) || {}
  return (
    <>
      <header className="header">
        <div className="wrapper-content-header">
          <div className="header-left">
            <Link to="/tv-show">TV Show</Link>
            <Link to="/tv-show">Movie</Link>
          </div>
          <div className="header-right">
            <p>
              Hi!! <span>{userLogin?.lastName}</span>
            </p>
            <Link to='/profile' className="avatar">
              <img src={userLogin?.avatar} alt="" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
