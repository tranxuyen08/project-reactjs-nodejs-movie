import React from "react";
import "./UserManager.css";
import BaseAxios from "../../api/axiosInstance";
import { useState, useEffect } from "react";

const Users = () => {
  const [data, setData] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const handleGetUser = async () => {
    try {
      const response = await BaseAxios.get("/api/v1/users");
      const managerUser = response.data.blogs;
      setData(managerUser);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleUpdateRoleUser = async (id) => {
    try {
      const response = await BaseAxios.get(`/api/v1/users/${id}`);
      const updatedUser = response.data.user;

      if (!updatedUser) {
        console.error("User not found");
        return;
      }

      const newRoleActive = updatedUser.role_active === 1 ? 2 : 1;
      updatedUser.role_active = newRoleActive;

      const patchResponse = await BaseAxios.patch(`/api/v1/users/update/${id}`, updatedUser);
      if (patchResponse.data.success) {
        setIsLoading(!isLoading);
        handleGetUser();
      } else {
        console.error("Failed to update user role");
      }
    } catch (error) {
      // Handle API request error
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, [isLoading]);

  return (
    <div className="content-user">
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
                return (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
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
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
