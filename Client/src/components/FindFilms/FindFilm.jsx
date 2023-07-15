import React, { useEffect } from "react";
import "./FindFilm.css";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { getAll } from "../../redux/reducer/movieSlice";
import { useDispatch, useSelector } from "react-redux";
const FindFilm = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.data?.data);
  const handleGetAPI = async () => {
    try {
      await dispatch(getAll());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetAPI();
  }, []);
  return (
    <section className="find-film">
      <div className="wrapper-find-film">
        <h2 className="title-h2">FIND FILMS THAT BEST FIT YOU</h2>
        <ul className="list-card">
          {movies &&
            movies.map((item) => {
              const imgURL = 'https://image.tmdb.org/t/p/'+ 'original' + item.poster
              return (
                <li key={item._id} className="item-card">
                  <Link to={`/detail/${item._id}`} className="card-link">
                    <div className="card-img">
                      <img
                        src={imgURL}
                        alt=""
                      />
                    </div>
                    <p>{item.title}</p>
                  </Link>
                  <p className="ratting ratting-card">
                    {item.vote_average}
                    <span>
                      <AiFillStar className="icon-ratting" />
                    </span>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export default FindFilm;
