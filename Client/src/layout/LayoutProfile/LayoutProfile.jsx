import React from "react";
import SideBar from '../../components/Sidebar/Sidebar'

const LayoutProfile = ({children}) => {
  return (
    <>
    <SideBar/>
    {children}
    </>
  );
};

export default LayoutProfile;
