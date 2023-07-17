import React from "react";
import BaseAxios from "../../api/axiosInstance";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const ProductManager = () => {
  const [dataMovie, setData] = useState([]);
  const[isLoading, setIsLoading] = useState(false);
  const handleGetMovie = async () => {
    try {
      const response = await BaseAxios.get("/api/v1/movie");
      const managerMovie = response.data.data;
      setData(managerMovie);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await BaseAxios.delete(`/api/v1/movie/${id}`);
      const managerMovie = response?.data?.data;
      setIsLoading(!isLoading);
      setData(managerMovie);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleEdit = () => {};
  console.log("dada", dataMovie);
  useEffect(() => {
    handleGetMovie();
  }, [isLoading]);

  return (
    <div className="content-user">
      <div className="table-content">
        <div className="wrapper-title">
          <span className="sperator"></span>
          <span className="title-page">Quản Lý Sản Phẩm</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ảnh</th>
              <th>Tên Phim</th>
              <th>Thể Loại</th>
              <th>Ngày Chiếu</th>
              <th colSpan={2}>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {dataMovie.length > 0 && dataMovie?.map((item, index) => {
              return (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="content-img">
                      <img
                        src={
                          "https://image.tmdb.org/t/p/" +
                          "original" +
                          item?.backdrop_path
                        }
                        alt="product"
                      />
                    </div>
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.typeMovie}</td>
                  <td>{item?.role_movie === 1 ? "Free" : "No Free"}</td>
                  <td>
                    <AiFillDelete
                      onClick={() => handleDelete(item._id)}
                      className="btn-delete"
                    />
                    <FaEdit
                      onClick={() => handleEdit(item)}
                      className="btn-delete"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* <button onClick={handleCreate} className="btn-add">
            <AiOutlineVideoCameraAdd />
            Thêm Phim
          </button>
          {showConfirmModal && (
            <ModelComfirmDelete
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          )}
          {showCreateModal && (
            <ModelAdmin
              editProduct={editProduct}
              setShowCreateModal={setShowCreateModal}
              handleCreateModalClose={handleCreateModalClose}
              onClose={handleCreateModalClose}
            />
          )} */}
      </div>
    </div>
  );
};

export default ProductManager;
