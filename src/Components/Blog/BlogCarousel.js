import React from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BlogCarousel.css";

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const CardSlider = ({ items }) => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {items && items.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="blogCard">
            <img src={item.image} alt={item.title} />
            <div className="blogCard-body">
              <h5 className="blogCard-title">{item.title}</h5>
              <p className="blogCard-text">{item.description}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CardSlider;
