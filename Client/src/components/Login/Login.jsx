import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/reducer/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  const handleChangeInput = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const loginValue = inputValue;
      const dataLogin = await dispatch(login(loginValue)).unwrap();
      if (dataLogin && dataLogin.data.data.role_active == 1) {
        navigate("/");
      } else {
        alert('Your account is banned');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="sect-login">
      <div className="bkg-img"></div>
      <div className="container">
        <div className="wrapper-login">
          <h2 className="title-login">Sign In To Moonlight</h2>
          <div className="login-with">
            <button className="h-12 w-12 rounded-full bg-white tw-flex-center hover:brightness-75 transition duration-300">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 48 48"
                enable-background="new 0 0 48 48"
                className="text-primary"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
            </button>
            <button className="h-12 w-12 rounded-full bg-white tw-flex-center hover:brightness-75 transition duration-300">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-primary"
                height="25"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
              </svg>
            </button>
          </div>
          <form
            className="form"
            action="/create"
            method="POST"
            onSubmit={handleSignIn}
          >
            <input
              onChange={handleChangeInput}
              className="email"
              name="email"
              type="email"
              placeholder="Email.."
            />
            <input
              onChange={handleChangeInput}
              className="password"
              name="password"
              type="password"
              placeholder="Password.."
            />
            <input className="btn btn-signin" type="submit" value="Sign In" />
          </form>
          <p className="text-sign-up">
            Not a member?<Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
