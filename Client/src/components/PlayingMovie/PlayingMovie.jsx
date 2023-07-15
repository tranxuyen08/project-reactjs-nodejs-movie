import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./PlayingMovie.css";
import BaseAxios from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import axios from "axios";
const PlayingMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [width, setWidth] = useState("560");
  const [height, setHight] = useState("315");
  const [isCheckFavorite, setIsCheckFavorite] = useState(false);

  const fetchMovie = async () => {
    try {
      const response = await BaseAxios.get(`/api/v1/movie/${params?.id}`);
      setMovie(response.data.data);
      setWidth("560");
      setHight("315");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheckFavorite = async () => {
    try {
      const response = await BaseAxios.get(`/api/v1/favorite`);
      const favorites = response.data;
      const isFavorite = favorites.some(
        (favorite) => favorite.idMovie === params?.id
      );
      setIsCheckFavorite(isFavorite);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchMovie();
    handleCheckFavorite();
  }, []);

  const handleFullScreen = () => {
    const videoElement = document.getElementById("movie-video");

    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  };

  const handleFavorite = async (id) => {
    const requestData = {
      idMovie: id,
    };
    try {
      if (isCheckFavorite) {
        await BaseAxios.post(`/api/v1/favorite`,requestData);
        setIsCheckFavorite(!isCheckFavorite);
        console.log("Đã xoá yêu thích");
      } else {
        await BaseAxios.post(`/api/v1/favorite`, requestData);
        setIsCheckFavorite(!isCheckFavorite);
        console.log("Đã thích");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <section className="playing-movie">
      <div className="container-middle">
        <div className="wrapper-playing">
          <div className="wrapper-video">
            <iframe
              id="movie-video"
              width={width}
              height={height}
              src={movie?.video}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <button onClick={handleFullScreen} className="btn btn-full-screen">
            Full Screen
          </button>
          <div className="title-movie">
            <h2>{movie?.title}</h2>
          </div>
          <div className="action">
            <div className="ratting">
              <AiOutlineStar className="star" />
              <p>{movie?.vote_average}</p>
            </div>
            <p onClick={() => handleFavorite(movie?._id)}>
              {isCheckFavorite ? (
                <MdFavorite className="icon-favorite" />
              ) : (
                <MdOutlineFavoriteBorder className="icon-favorite" />
              )}
            </p>
          </div>
          <div className="over-view">
            <h3 className="title-h3">Overview:</h3>
            <p className="">{movie?.overview}</p>
          </div>

          <div className="comment">
            <div className="content-comment">
              <h3 className="">Comments:</h3>
              <ul id="comment-list">
                <li className="item-content">
                  <div className="user-cmt">
                    <div className="avatar">
                      <img src="/image/download.jpeg" alt="" />
                    </div>
                    <div className="user-name">
                      <p>XuyenTN :</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="">asdasddasdasdadasdasdasdasdasdasdasdasd</p>
                  </div>
                </li>
                <li className="item-content">
                  <div className="user-cmt">
                    <div className="avatar">
                      <img src="/image/download.jpeg" alt="" />
                    </div>
                    <div className="user-name">
                      <p>XuyenTN :</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="">asdasddasdasdadasdasdasdasdasdasdasdasd</p>
                  </div>
                </li>
                <li className="item-content">
                  <div className="user-cmt">
                    <div className="avatar">
                      <img src="/image/download.jpeg" alt="" />
                    </div>
                    <div className="user-name">
                      <p>XuyenTN :</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="">asdasddasdasdadasdasdasdasdasdasdasdasd</p>
                  </div>
                </li>
                <li className="item-content">
                  <div className="user-cmt">
                    <div className="avatar">
                      <img src="/image/download.jpeg" alt="" />
                    </div>
                    <div className="user-name">
                      <p>XuyenTN :</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="">asdasddasdasdadasdasdasdasdasdasdasdasd</p>
                  </div>
                </li>
                <li className="item-content">
                  <div className="user-cmt">
                    <div className="avatar">
                      <img src="/image/download.jpeg" alt="" />
                    </div>
                    <div className="user-name">
                      <p>XuyenTN :</p>
                    </div>
                  </div>
                  <div className="">
                    <p className="">asdasddasdasdadasdasdasdasdasdasdasdasd</p>
                  </div>
                </li>
              </ul>
              <form id="comment-form">
                <input
                  type="text"
                  id="comment-input"
                  placeholder="Write a comment..."
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayingMovie;