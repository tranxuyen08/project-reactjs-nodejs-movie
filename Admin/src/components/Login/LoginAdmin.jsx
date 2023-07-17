import React from "react";
import "./LoginAdmin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../redux/reducer/adminSlice";
const LoginAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const handleChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const loginValue = inputValue;
      const dataLogin = await dispatch(loginAdmin(loginValue)).unwrap();
      if (dataLogin && dataLogin.data.data.role_admin == 2) {
        navigate("/");
      } else {
        alert("You Not Admin");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section className="sect-login">
        {" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span /> <span /> <span /> <span /> <span />{" "}
        <span /> <span /> <span /> <span />
        <div className="signin">
          <div className="content">
            <h2>Sign In</h2>
            <form
              method="POST"
              action="/login"
              className="form"
              onSubmit={handleSignIn}
            >
              <div className="inputBox">
                <input
                  onChange={handleChangeInput}
                  name="email"
                  type="text"
                  required=""
                />{" "}
                <i>Email</i>
              </div>
              <div className="inputBox">
                <input
                  onChange={handleChangeInput}
                  name="password"
                  type="password"
                  required=""
                />{" "}
                <i>Password</i>
              </div>
              <div className="links">
                {" "}
                <a href="#">Forgot Password</a> <a href="#">Signup</a>
              </div>
              <div className="inputBox">
                <input type="submit" defaultValue="Login" />
              </div>
            </form>
          </div>
        </div>
      </section>{" "}
    </>
  );
};

export default LoginAdmin;
