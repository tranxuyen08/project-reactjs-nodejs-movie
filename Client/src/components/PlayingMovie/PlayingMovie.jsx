import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineSend } from "react-icons/ai";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./PlayingMovie.css";
import BaseAxios from "../../api/axiosClient";
import { useParams } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
const PlayingMovie = () => {
  const params = useParams();
  const [movie, setMovie] = useState();
  const [width, setWidth] = useState("560");
  const [height, setHight] = useState("315");
  const [isCheckFavorite, setIsCheckFavorite] = useState(false);
  const [comment, setComment] = useState();
  const [inputComment, setInputComment] = useState();
  const [isCheckCmt, setIsCheckCmt] = useState(false);
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
        (favorite) => favorite?.idMovie === params?.id
      );
      setIsCheckFavorite(isFavorite);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleGetComment = async () => {
    const id = params.id;
    BaseAxios.get(`/api/v1/comments/${id}`)
      .then((res) => {
        const dataComments = res.data.data;
        setComment(dataComments);
      })
      .catch((errors) => {
        console.error(errors);
      });
  };

  useEffect(() => {
    handleGetComment();
  }, [isCheckCmt]);

  useEffect(() => {
    fetchMovie();
    handleCheckFavorite();
    handleGetComment();
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
        await BaseAxios.post(`/api/v1/favorite`, requestData);
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

  const handleComment = async (e) => {
    e.preventDefault();
    if (inputComment !== "") {
      try {
        const requestBody = {
          idMovie: params.id,
          titleComment: inputComment,
        };
        await BaseAxios.post("/api/v1/comments", requestBody);
        setIsCheckCmt(!isCheckCmt);
        setInputComment("");
      } catch (error) {
        console.error("Error submitting comment:", error);
      }
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
              <p>{movie?.vote_average}</p>
              <AiFillStar className="icon-ratting" />
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
                {comment &&
                  comment?.map((item) => {
                    return (
                      <li className="item-content" key={item?._id}>
                        <div className="cmt-content">
                          <p className="cmt-content-text">
                            {item?.titleComment}
                          </p>
                        </div>
                        <div className="user-cmt">
                          <div className="avatar">
                            <img src={item?.idUser?.avatar.slice(1)} alt="" />
                            <p className="user-name">
                              {item?.idUser?.firstName + item?.idUser?.lastName}
                            </p>
                          </div>
                          <div className="like-wrapper">
                            <BiSolidLike className="like-icon" />
                            <span className="num-like">5</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
              </ul>
              <form className="comment-form" onSubmit={handleComment}>
                <input
                  type="text"
                  value={inputComment}
                  onChange={(e) => setInputComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <button type="submit" className="btn btn-submit">
                  <AiOutlineSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayingMovie;
