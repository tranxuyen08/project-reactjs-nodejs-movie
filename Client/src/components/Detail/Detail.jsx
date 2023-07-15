import React, { useEffect, useState } from "react";
import "./Detail.css";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import BaseAxios from "../../api/axiosClient";
import { Link, useNavigate, useParams } from "react-router-dom";
import FadingBox from "../Model/Model";

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const [movie, setMovie] = useState();
  const [imgPosterURL, setImgPosterUrl] = useState();
  const [imgBackImgURL, setImgBackImgURL] = useState();
  const [linkWatching, setLinkWatching] = useState();
  const [activeTab, setActiveTab] = useState("overview");
  const [isModelOpen, setIsModelOpen] = useState(false); // Add isModelOpen state variable

  const handleWatchingClick = () => {
    if (movie.role_movie == 1) {
      // Chuyển hướng qua trang "watching"
      setLinkWatching(`/playing-movie/${movie._id}`);
    } else if (movie.role_movie == 2) {
      const accessTokenUser = JSON.parse(localStorage.getItem("accessToken"));
      const userLogin = JSON.parse(localStorage.getItem("userLogin"));
      if (accessTokenUser && userLogin.role_subscription === 1) {
        // Mở modal
        setIsModelOpen(true);
      } else {
        // Chuyển hướng qua trang "watching"
        setLinkWatching(`/playing-movie/${movie._id}`);
      }
    }
  };

  // Goij API
  const fetchMovie = async () => {
    await BaseAxios.get(`/api/v1/movie/${params?.id}`)
      .then((res) => {
        const movie = res.data.data;
        setMovie(movie);
        setImgPosterUrl(
          "https://image.tmdb.org/t/p/" + "original" + movie?.poster
        );
        setImgBackImgURL(
          "https://image.tmdb.org/t/p/" + "original" + movie?.backdrop_path
        );
        setValue(movie.vote_average);
      })
      .catch((errors) => {
        console.error(11111111, errors);
      });
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <section className="sect-detail">
      <div className="wrapper-middle">
        <div className="poster-movie">
          <div className="poster-movie-content">
            <div className="poster">
              <img src={imgBackImgURL} alt="" />
            </div>
            <div className="action-detail">
              <div>
                <div className="image-movie">
                  <img src={imgPosterURL} alt="" />
                </div>
                <h3 className="title-movie">{movie?.title}</h3>
                <Link
                  to={linkWatching}
                  className="btn btn-watch"
                  onClick={handleWatchingClick}
                >
                  <BsFillPlayFill />
                  Watching
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="content-movie">
          <div className="content-movie-left">
            <div style={{ width: 50, height: 50 }}>
              <p className="text-ratting">Ratting</p>
              <CircularProgressbar value={value * 10} />
            </div>
            <div className="ep-length">
              <p className="text-ratting">Ep Length</p>
              <span>1h20p</span>
            </div>
          </div>
          <div className="content-movie-middle">
            <div className="tab-links">
              <Link
                to=""
                className={activeTab === "overview" ? "active" : ""}
                onClick={() => handleTabChange("overview")}
              >
                Overview
              </Link>
              <Link
                to=""
                className={activeTab === "vote" ? "active" : ""}
                onClick={() => handleTabChange("vote")}
              >
                Vote
              </Link>
              <Link
                to=""
                className={activeTab === "comment" ? "active" : ""}
                onClick={() => handleTabChange("comment")}
              >
                Comment
              </Link>
            </div>
            {activeTab === "overview" && (
              <div>
                <p className="text-ratting">Story</p>
                <span>{movie?.overview}</span>
                <div className="detail">
                  <p className="text-ratting">Detail</p>
                  <p className="detail-content">
                    Status:{" "}
                    <span className="status">
                      {movie?.role_movie == 1 ? "Free" : "NO FREE"}
                    </span>
                  </p>
                  <p className="detail-content">
                    Release Date:{" "}
                    <span>{movie?.release_date.split("T")[0]}</span>
                  </p>
                  <p className="detail-content">
                    Language: <span>English</span>
                  </p>
                </div>
              </div>
            )}
            {activeTab === "vote" && (
              <div>
                <p className="text-ratting">Vote</p>
                {/* Hiển thị nội dung của tab Vote */}
              </div>
            )}
            {activeTab === "comment" && (
              <div>
                <p className="text-ratting">Comment</p>
                <div className="wrapper-comment">
                  {/* {comments.map((comment) => ( */}
                  <div className="show-comment">
                    <div className="user">
                      <div className="wrapper-img">
                        <img src="/image/download.jpeg" alt="User Avatar" />
                      </div>
                      <p className="name-comment">Xuyen</p>
                    </div>
                    <div className="wrapper-comment-content">
                      <p>noi dung comment</p>
                    </div>
                  </div>
                  <div className="show-comment">
                    <div className="user">
                      <div className="wrapper-img">
                        <img src="/image/download.jpeg" alt="User Avatar" />
                      </div>
                      <p className="name-comment">Xuyen</p>
                    </div>
                    <div className="wrapper-comment-content">
                      <p>noi dung comment</p>
                    </div>
                  </div>
                  <div className="show-comment">
                    <div className="user">
                      <div className="wrapper-img">
                        <img src="/image/download.jpeg" alt="User Avatar" />
                      </div>
                      <p className="name-comment">Xuyen</p>
                    </div>
                    <div className="wrapper-comment-content">
                      <p>noi dung comment</p>
                    </div>
                  </div>
                  <div className="show-comment">
                    <div className="user">
                      <div className="wrapper-img">
                        <img src="/image/download.jpeg" alt="User Avatar" />
                      </div>
                      <p className="name-comment">Xuyen</p>
                    </div>
                    <div className="wrapper-comment-content">
                      <p>noi dung comment</p>
                    </div>
                  </div>
                  {/* ))} */}
                </div>
                <form className="comment-form">
                  <input
                    type="text"
                    // value={newComment}
                    // onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                  />
                  <button type="submit" className="btn">
                    <AiOutlineSend />
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="content-movie-right">
            <p className="text-ratting">Trailler</p>
            <div className="img-trailler">
              <iframe
                className="trailler"
                src={movie?.video}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="movie-genre">
              {movie?.typeMovie.map((item, index) => {
                return (
                  <p className="detail-content" key={index}>
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isModelOpen && <FadingBox setIsModelOpen={setIsModelOpen} />}{" "}
      {/* Pass setIsModelOpen as a prop */}
    </section>
  );
};

export default Detail;
