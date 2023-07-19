import React from "react";
import BaseAxios from "../../api/axiosInstance";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import LoadingComponent from "../Loading";
import ModelComfirmDelete from "../ModalComfirm/ModalConfirm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductManager = () => {
  const [dataMovie, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleGetMovie = async (page) => {
    try {
      const response = await BaseAxios.get("/api/v1/movie", {
        params: {
          _page: page,
          _limit: pagination?._limit,
        },
      });
      const managerMovie = response.data.data;
      setPagination(response.data.pagination);
      setData(managerMovie);
      setIsLoad(false);
    } catch (error) {
      setIsLoad(false);
      console.error("Error:", error);
    }
  };

  const handleOnPageChange = (page) => {
    handleGetMovie(page);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setDeleteProductId(id);
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    try {
      await BaseAxios.delete(`/api/v1/movie/${deleteProductId}`);
      setIsLoading(!isLoading);
      setIsLoad(false);
      toast.success("Delete successfuly!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setIsLoad(false);
      console.error("Error:", error);
    }
  };

  const handleEdit = (data) => {
    setIsModalOpen(true);
    setEditData(data);
  };

  const handleUpdateSuccess = () => {
    setUpdateSuccess(!updateSuccess);
  };

  useEffect(() => {
    handleGetMovie(pagination?._page || 1);
  }, [isLoading, updateSuccess]);

  return (
    <div className="content-user">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      {isLoad && <LoadingComponent />}
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
            {dataMovie.length > 0 &&
              dataMovie.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="content-img">
                      <img
                        src={
                          item?.backdrop_path.includes("http://")
                            ? item?.backdrop_path
                            : `
                        https://image.tmdb.org/t/p/original${item?.backdrop_path}`
                        }
                        alt="product"
                      />
                    </div>
                  </td>
                  <td>{item?.title}</td>
                  <td>
                    {Array.isArray(item.typeMovie)
                      ? item.typeMovie.join(", ")
                      : item.typeMovie}
                  </td>
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
              ))}
          </tbody>
        </table>
        <Pagination
          pagination={pagination}
          handleOnPageChange={handleOnPageChange}
        />
      </div>
      {showConfirmModal && (
        <ModelComfirmDelete onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
      <Modal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        editData={editData}
      />
    </div>
  );
};

export default ProductManager;
