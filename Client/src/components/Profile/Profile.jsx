import React, { useState, useEffect } from "react";
import { AiFillEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { BsSave2 } from "react-icons/bs";
import "./Profile.css";
import BaseAxios from "../../api/axiosClient";

const Profile = () => {
  const userLogin = JSON.parse(localStorage.getItem("userLogin")) || {};
  const [firstName, setFirstName] = useState(userLogin?.firstName);
  const [lastName, setLastName] = useState(userLogin?.lastName);
  const [originalFirstName, setOriginalFirstName] = useState(userLogin?.firstName);
  const [originalLastName, setOriginalLastName] = useState(userLogin?.lastName);
  const [isEditingFirstName, setIsEditingFirstName] = useState(false);
  const [isEditingLastName, setIsEditingLastName] = useState(false);

  useEffect(() => {
    setOriginalFirstName(userLogin?.firstName);
    setOriginalLastName(userLogin?.lastName);
  }, [userLogin]);

  const handleEditFirstName = () => {
    setIsEditingFirstName(!isEditingFirstName);
    if (!isEditingFirstName) {
      setFirstName(originalFirstName);
    }
  };

  const handleEditLastName = () => {
    setIsEditingLastName(!isEditingLastName);
    if (!isEditingLastName) {
      setLastName(originalLastName);
    }
  };

  const handleChangeName = (e, name) => {
    if (name === "firstName") {
      setFirstName(e.target.value);
    } else if (name === "lastName") {
      setLastName(e.target.value);
    }
  };

  const handleSaveFirstName = () => {
    setIsEditingFirstName(false);
    // Thực hiện lưu trữ giá trị mới vào database hoặc thực hiện các hành động khác
    saveProfileData();
  };

  const handleSaveLastName = () => {
    setIsEditingLastName(false);
    // Thực hiện lưu trữ giá trị mới vào database hoặc thực hiện các hành động khác
    saveProfileData();
  };

  const saveProfileData = () => {
    console.log(firstName);
    console.log(lastName);
    const UserLogin = JSON.parse(localStorage.getItem("userLogin"));
    BaseAxios.patch(`/api/v1/users/update/${UserLogin._id}`, {
      firstName: firstName,
      lastName: lastName,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const newUser = response.data?.data;
          localStorage.setItem("userLogin", JSON.stringify(newUser));
        } else {
          console.log("looix");
        }
      })
      .catch((error) => {
        // Xử lý lỗi khi gọi API
        console.error(error);
      });
  };

  return (
    <section className="profile">
      <div className="container-middle">
        <div className="wrapper-profile">
          <h2 className="title-h2-profile">Account Setting</h2>
          <div className="content">
            <div className="content-left">
              <div className="wrapper-content-left">
                <div className="user-infor">
                  <h3 className="title-h3-profile">User Information</h3>
                  <p className="title-text">
                    Here you can edit public information about your account. If
                    you signed in with Google or Facebook, you can't change your
                    email and password
                  </p>
                </div>
                <div className="user-infor">
                  <h3 className="title-h3-profile">Email</h3>
                  <div>
                    <input
                      className="change-input"
                      type="email"
                      name="email"
                      value={userLogin?.email}
                      readOnly
                    />
                    <button className="btn btn-edit">
                      {/* <BiRightArrow /> */}
                      <AiFillEdit />
                    </button>
                  </div>
                </div>
                <div className="user-infor">
                  <h3 className="title-h3-profile">Last Name</h3>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      className={`change-input ${isEditingLastName ? "editable" : ""}`}
                      onChange={(e) => handleChangeName(e, "lastName")}
                      readOnly={!isEditingLastName}
                    />
                    <button className="btn btn-edit" onClick={isEditingLastName ? handleSaveLastName : handleEditLastName}>
                      {isEditingLastName ? <BsSave2 /> : <AiFillEdit />}
                    </button>
                  </div>
                </div>
                <div className="user-infor">
                  <h3 className="title-h3-profile">First Name</h3>
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      className={`change-input ${isEditingFirstName ? "editable" : ""}`}
                      onChange={(e) => handleChangeName(e, "firstName")}
                      readOnly={!isEditingFirstName}
                    />
                    <button className="btn btn-edit" onClick={isEditingFirstName ? handleSaveFirstName : handleEditFirstName}>
                      {isEditingFirstName ? <BsSave2 /> : <AiFillEdit />}
                    </button>
                  </div>
                </div>
                <div className="user-infor">
                  <h3 className="title-h3-profile">Password</h3>
                  <div>
                    <input
                      className="change-input"
                      type="password"
                      name="email"
                      value={userLogin?.password}
                      placeholder="New Password"
                      readOnly
                    />
                    <button className="btn btn-edit">
                      {/* <BiRightArrow /> */}
                      <AiFillEdit />
                    </button>
                  </div>
                </div>
                <button className="btn btn-delete">Delete Account</button>
              </div>
            </div>
            <div className="content-right">
              <div className="wrapper-content-right">
                <h3 className="title-h3-profile">Profile Photo</h3>
                <div className="content-photo">
                  <div className="avatar-profile">
                    <img src={userLogin?.avatar} alt="" />
                  </div>

                  <label htmlFor="file" className="btn btn-upload">
                    <AiOutlineCloudUpload className="icon-upload" />
                    <p>Upload Image</p>
                  </label>
                  <input type="file" name="" id="file" style={{ display: "none" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;