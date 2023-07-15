import React, { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import "./BookMarked.css";
import BaseAxios from "../../api/axiosClient";

const BookMarked = () => {
  const [dataFavorite, setDataFavorite] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  const handleGetFavorite = async () => {
    try {
      const response = await BaseAxios.get("/api/v1/favorite");
      const favoriteMovies = response.data.favoriteMovies;
      setDataFavorite(favoriteMovies);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteFavorite = async (id) => {
    try {
      await BaseAxios.delete(`/api/v1/favorite/${id}`);
      setReloadData(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleGetFavorite();
  }, [reloadData]);

  return (
    <section className="bookmarked profile">
      <div className="container-middle">
        <div className="wrapper-bookmarked">
          <div className="header-bookmarked">
            <h2 className="title-h2">My Favorite Films</h2>
          </div>
          <div className="wrapper-list-card">
            <ul className="list-card">
              {dataFavorite.length === 0 ? (
                <p>No favorite movies found.</p>
              ) : (
                dataFavorite.map((item) => {
                  const imgURL =
                    "https://image.tmdb.org/t/p/original" + item?.idMovie?.poster;
                  return (
                    <li key={item?.idMovie?._id} className="item-card">
                      <Link
                        to={`/detail/${item?.idMovie?._id}`}
                        className="card-link"
                      >
                        <div className="card-img">
                          <img src={imgURL} alt="" />
                        </div>
                        <p>{item?.idMovie?.title}</p>
                      </Link>
                      <div className="delete">
                        <p
                          className="btn-delete-fvr"
                          onClick={() =>
                            handleDeleteFavorite(item?.idMovie?._id)
                          }
                        >
                          <TiDeleteOutline />
                        </p>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookMarked;
