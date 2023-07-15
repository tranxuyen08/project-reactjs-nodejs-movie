import React from "react";
// import Header from "../../components/Header/Header";
// import Slide from "../../components/Slide/Slide";
import "./DefaultLayout.css";
// import ShowMovie from "../../components/ShowMovie/ShowMovie";
import RightBar from "../../components/RightBar/RightBar";
import Sidebar from "../../components/Sidebar/Sidebar";
const DefaultLayout = ({children}) => {
  return (
    <>
      <Sidebar />
      <div className="wrapper-middle-content">
        <div className="container-middle">
          {children}
        </div>
      </div>
      <RightBar />
    </>
  );
};

export default DefaultLayout;
