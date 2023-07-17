import React from "react";
import "./SideBarAdmin.css";
import { Link, useLocation } from "react-router-dom";
import { BiLogOutCircle, BiCameraMovie } from "react-icons/bi";
import {
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineUser
} from "react-icons/ai";
const SideBarAdmin = () => {
  const location = useLocation();
  const accessTokenLogin = JSON.parse(localStorage.getItem("accessToken"));
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");
  };
  return (
    <section className="set-side-bar">
      <div className="container">
        <div>
          <div className="wrapper-header">
            <Link to="/" className="wrapper-img">
              <h1>AdminPage</h1>
            </Link>
          </div>
          <div className="list-nav">
            <div className="item-nav">
              <h3 className="title-h3">Menu</h3>
              <ul className="">
                <li className={location.pathname === "/" ? "active" : ""}>
                  <Link to="/">
                    <AiOutlineUser/>
                    <p>User Manager</p>
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/products-manager" ? "active" : ""
                  }
                >
                  <Link to="/products-manager">
                    <BiCameraMovie/>
                    <p>Products Manager</p>
                  </Link>
                </li>
                <li
                  className={
                    location.pathname === "/order-manager" ? "active" : ""
                  }
                >
                  <Link to="/order-manager">
                    <AiOutlineShoppingCart/>
                    <p>Order Manager</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="item-nav">
              <ul className="">
                <li
                  className={location.pathname === "/Profile" ? "active" : ""}
                ></li>
                {accessTokenLogin ? (
                  <li
                    onClick={handleLogout}
                    className={location.pathname === "/Login" ? "active" : ""}
                  >
                    <Link to="/Login">
                      <BiLogOutCircle className="icon" />
                      <p>Logout</p>
                    </Link>
                  </li>
                ) : (
                  <li
                    className={location.pathname === "/Login" ? "active" : ""}
                  >
                    <Link to="/Login">
                      <AiOutlineLogin className="icon" />
                      <p>Login</p>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideBarAdmin;
