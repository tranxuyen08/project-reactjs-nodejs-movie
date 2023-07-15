import React, { useEffect } from "react";
// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Slide.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getMovieShowSlide } from "../../redux/reducer/movieSlice";
const Slide = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.data?.data);
  const handleGetMovie = async () => {
    try {
      await dispatch(getMovieShowSlide());
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetMovie();
  }, []);
  return (
    <section className="sect-slide">
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={false}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {movies &&
            movies?.map((item) => {
              const imgURL =
                "https://image.tmdb.org/t/p/" + "original" + item.backdrop_path;
              return (
                <SwiperSlide key={item._id}>
                  <Link to={`/detail/${item._id}`}>
                    <img src={imgURL} alt="" />
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default Slide;
