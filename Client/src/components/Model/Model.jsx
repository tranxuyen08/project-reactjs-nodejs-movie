import React, { useState } from "react";
import "./Model.css";
import { AiOutlineClose } from "react-icons/ai";
import BaseAxios from "../../api/axiosClient";

const FadingBox = ({ setIsModelOpen }) => {
  const handleModalClose = () => {
    setIsModelOpen(false);
  };
  const handlePaymentFree = () => {
    setIsModelOpen(false);
    alert("Mua Goi VIP de co the xem phim");
  };
  const handlePaymentVIP = async () => {
    const UserLogin = JSON.parse(localStorage.getItem('userLogin'))
    BaseAxios.patch(`/api/v1/users/update/${UserLogin._id}`, {
      role_subscription: 2,
    })
      .then((response) => {
        if (response.status === 200) {
          const newUser = response.data?.data
          localStorage.setItem('userLogin',JSON.stringify(newUser))
        } else {

          console.log('looix');
        }
      })
      .catch((error) => {
        // Xử lý lỗi khi gọi API
        console.error(error);
      });
  };
  return (
    <div className="modal">
      <p className="closetab" onClick={handleModalClose}>
        <AiOutlineClose className="close-icon" />
      </p>
      <div className="modal-content">
        <h2>Experience the free movie package</h2>
        <div className="wrapper-card-service">
          <div className="card-service">
            <div className="card-service-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSEV-lqEPCAZMRvaxfHi6EwKDpgBggClXrg&usqp=CAU"
                alt=""
              />
            </div>
            <div className="content-service">
              <p className="title">Trai nghiem Xem phim mieen phi</p>
              <p className="title">Xem phim full hd 720</p>
              <p className="title">Co Quang Cao</p>
              <p className="title">Chi truy cap tren 1 thiet bij</p>
            </div>
            <button className="btn-buy" onClick={handlePaymentFree}>
              Payment
            </button>
          </div>
        </div>
      </div>
      <div className="modal-content">
        <h2>VIP package experience for life</h2>
        <div className="wrapper-card-service">
          <div className="card-service">
            <div className="card-service-img">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSEV-lqEPCAZMRvaxfHi6EwKDpgBggClXrg&usqp=CAU"
                alt=""
              />
            </div>
            <div className="content-service">
              <p className="title">Trai nghiem Xem phim toc do cao</p>
              <p className="title">Xem phim full hd 4k</p>
              <p className="title">Khong Co Quang Cao</p>
              <p className="title">Chi truy cap tren 3 thiet bij</p>
            </div>
            <button className="btn-buy" onClick={handlePaymentVIP}>
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FadingBox;
