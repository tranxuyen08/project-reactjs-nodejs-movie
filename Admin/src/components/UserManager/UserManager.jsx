import React from "react";
import "./UserManager.css";
import BaseAxios from "../../api/axiosInstance";
import { useState, useEffect } from "react";
import LoadingComponent from "../Loading";

const Users = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(true); // lần đầu mount component thì luôn để true để chờ useEffect gọi api về

  const handleGetUser = async () => {
    try {
      const response = await BaseAxios.get("/api/v1/users");
      const managerUser = response.data.blogs;
      setData(managerUser);
      //set loading false khi nhận dữ liệu
      setIsLoad(false)
    } catch (error) {
      //cũng set loading false khi call api thất bại
      setIsLoad(false)
      console.error("Error:", error);
    }
  };

  const handleUpdateRoleUser = async (id) => {
    //trước khi gọi api ,thì set Loading true
    setIsLoad(true)
    try {
      const response = await BaseAxios.get(`/api/v1/users/${id}`);
      const updatedUser = response.data.user;

      if (!updatedUser) {
        console.error("User not found");
        return;
      }

      const newRoleActive = updatedUser.role_active === 1 ? 2 : 1;
      updatedUser.role_active = newRoleActive;

      const patchResponse = await BaseAxios.patch(
        `/api/v1/users/update/${id}`,
        updatedUser
      );
      handleGetUser();
      //Khi call thành công thì set loading false
      setIsLoad(false)
      if (patchResponse.data.success) {
        setIsLoading(!isLoading);
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      //khi call thất bại thì cũng set loading false
      setIsLoad(false)
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [isLoading]);

  return (
    <div className="content-user">
      {isLoad && <LoadingComponent/>}

      <div className="table-content">
        <div className="wrapper-title">
          <span className="sperator"></span>
          <span className="title-page">Quản Lý Người Dùng</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>ID Người Dùng</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status Account</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item, index) => {
                // Kiểm tra nếu không phải admin, hiển thị người dùng
                if (item.role_admin !== 1) {
                  return (
                    <tr key={item._id}>
                      <td>{index}</td>
                      <td>{item._id}</td>
                      <td>{item.email}</td>
                      <td>{item.role_admin === 1 ? "User" : "Admin"}</td>
                      <td>
                        <button
                          onClick={() => handleUpdateRoleUser(item._id)}
                          className="btn btn-update-user"
                        >
                          {item?.role_active === 1 ? (
                            <>
                              Active <span className="active-dot green"></span>
                            </>
                          ) : (
                            <>
                              Banned <span className="active-dot red"></span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return null; // Ẩn admin
                }
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
