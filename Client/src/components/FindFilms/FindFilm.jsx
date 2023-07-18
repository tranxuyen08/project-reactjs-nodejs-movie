import React, { useEffect, useState } from "react";
import "./FindFilm.css";
import { Link, useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { getAll } from "../../redux/reducer/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";
import querystring from "query-string";
import BaseAxios from "../../api/axiosClient";
import LoadingComponent from "../Loading/Loading";

const FindFilm = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state?.movie.data?.data);
  const pagination = useSelector((state) => state?.movie?.data?.pagination);
  const [dataMovie , setDataMovie] = useState([])
  const [isLoad, setIsLoad] = useState(true); // lần đầu mount component thì luôn để true để chờ useEffect gọi api về

  const handleGetAPI = async () => {
    try {
      await dispatch(getAll());
      setIsLoad(false)
    } catch (err) {
      setIsLoad(false)
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetAPI();
  }, []);

  const [filter, setFilter] = React.useState({
    _limit: 10,
    _page: 1,
  });

  const handleOnPageChange = (page) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };

  useEffect(() => {
    const handleFilter = async () => {
      try {
        const queryString = querystring.stringify(filter);
        const response = await BaseAxios.get(`/api/v1/movie?${queryString}`);
        setDataMovie(response.data.data)
      } catch (error) {
        console.error(error);
      }
    };
    handleFilter();
  }, [filter]);
  return (
    <section className="find-film">
      {isLoad && <LoadingComponent/>}
      <div className="wrapper-find-film">
        <h2 className="title-h2">FIND FILMS THAT BEST FIT YOU</h2>
        <ul className="list-card">
          {dataMovie &&
            dataMovie?.map((item) => {
              const imgURL =
                "https://image.tmdb.org/t/p/" + "original" + item?.poster;
              return (
                <li key={item?._id} className="item-card">
                  <Link to={`/detail/${item?._id}`} className="card-link">
                    <div className="card-img">
                      <img src={imgURL} alt="" />
                    </div>
                    <p>{item?.title}</p>
                  </Link>
                  <p className="ratting ratting-card">
                    {item?.vote_average}
                    <span>
                      <AiFillStar className="icon-ratting" />
                    </span>
                  </p>
                </li>
              );
            })}
        </ul>
        {pagination?._page && (
          <Pagination
            pagination={pagination}
            onPageChange={handleOnPageChange}
          />
        )}
      </div>
    </section>
  );
};

export default FindFilm;
