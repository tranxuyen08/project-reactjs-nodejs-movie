import React, { useState } from "react";
import "./CreateProduct.css";
import BaseAxios from "../../api/axiosInstance";
import {AiOutlineCloudUpload} from 'react-icons/ai'

function CreateProduct() {
  const [title, setTitle] = useState("");
  const [video, setTrailer] = useState("");
  const [overview, setOverview] = useState("");
  const [typeMovie, setTypes] = useState([]);
  const [backdrop_paths, setBackdropPaths] = useState([]);
  const [posters, setPosters] = useState([]);
  const [role_movie, setRole] = useState("");
  const [valueCreate, setvalueCreate] = useState({
    title: "",
    video: "",
    overview: "",
    types: "",
    backdrop_path: "",
    poster: "",
    role: "",
  });

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleTrailerChange = (event) => {
    setTrailer(event.target.value);
  };

  const handleOverviewChange = (event) => {
    setOverview(event.target.value);
  };

  const handleTypeChange = (event) => {
    const { value, checked } = event.target;

    // Tạo một bản sao mới của mảng types
    const newTypes = [...typeMovie];

    if (checked) {
      // Nếu checkbox được chọn, thêm giá trị vào mảng
      newTypes.push(value);
    } else {
      // Nếu checkbox bị bỏ chọn, loại bỏ giá trị khỏi mảng
      const index = newTypes.indexOf(value);
      if (index > -1) {
        newTypes.splice(index, 1);
      }
    }

    setTypes(newTypes);
  };

  const handleBackdropChange = (event) => {
    setBackdropPaths(event.target.files);
  };

  const handlePosterChange = (event) => {
    setPosters(event.target.files);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    console.log(123123, formData);
    formData.append("title", title);
    formData.append("trailer", video);
    formData.append("overview", overview);
    formData.append("typeMovie", typeMovie.join(","));
    for (let i = 0; i < backdrop_paths.length; i++) {
      formData.append("backdrop_path", backdrop_paths[i]);
    }
    for (let i = 0; i < posters.length; i++) {
      formData.append("poster", posters[i]);
    }
    formData.append("role_movie", role_movie);

    try {
      const response = await BaseAxios.post(
        `/api/v1/movie/add-movie`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const newMovie = response.data;
      console.log(12311, newMovie);
      setTitle("");
      setTrailer("");
      setOverview("");
      setTypes([]);
      setBackdropPaths([]);
      setPosters([]);
      setRole("");

      console.log("New movie created:", newMovie);
    } catch (error) {
      console.error("Error creating movie:", error);
    }
  };

  return (
    <div className="sect-create create-product-form-container">
      <div className="container-middle">
        <div className="wrapper-content-add">
          <div className="wrapper-title">
            <span className="sperator"></span>
            <span className="title-page">Create product</span>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Tên phim:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="trailer">Trailer phim:</label>
              <input
                type="text"
                id="trailer"
                name="video"
                value={video}
                onChange={handleTrailerChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="overview">Overview:</label>
              <textarea
                id="overview"
                name="overview"
                value={overview}
                onChange={handleOverviewChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Loại phim:</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="typeMovie"
                    value="action"
                    checked={typeMovie.includes("action")}
                    onChange={handleTypeChange}
                  />
                  Hành động
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="typeMovie"
                    value="adventure"
                    checked={typeMovie.includes("adventure")}
                    onChange={handleTypeChange}
                  />
                  Phiêu lưu
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="typeMovie"
                    value="comedy"
                    checked={typeMovie.includes("comedy")}
                    onChange={handleTypeChange}
                  />
                  Hài
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="typeMovie"
                    value="drama"
                    checked={typeMovie.includes("drama")}
                    onChange={handleTypeChange}
                  />
                  Kịch tính
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="backdrop">Backdrop:</label>
              <label className="upload-wrapper" htmlFor="backdrop"><AiOutlineCloudUpload/>
              <p>Upload file here !</p>
              </label>
              <input
              style={{display:'none'}}
                type="file"
                id="backdrop"
                name="backdrop_path"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handleBackdropChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="poster">Poster:</label>
              <label className="upload-wrapper" htmlFor="poster"><AiOutlineCloudUpload/>
              <p>Upload file here !</p>
              </label>
              <input
                style={{display:'none'}}
                type="file"
                id="poster"
                name="poster"
                accept="image/jpeg, image/jpg, image/png"
                onChange={handlePosterChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role movie:</label>
              <select
                id="role"
                name="role_movie"
                value={role_movie}
                onChange={handleRoleChange}
                required
              >
                <option value="">Chọn role movie</option>
                <option value="1">Yes</option>
                <option value="2">No</option>
              </select>
            </div>

            <button type="submit" className="btn btn-create">
              Tạo sản phẩm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
