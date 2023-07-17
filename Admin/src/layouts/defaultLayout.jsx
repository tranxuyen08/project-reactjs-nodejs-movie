import React from "react";
import SideBarAdmin from "../components/SideBarAdmin/SideBarAdmin";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <SideBarAdmin />
      {children}
    </>
  );
};

export default DefaultLayout;
