import Slider from "react-slick";
import { useState, useEffect, useRef } from 'react';
import "./slick.css";
import "./slick-theme.css";
import data from './mock.json';
import RecentCard from '../RecentCard';

export const SimpleSlider = ({ initialSlide = 0 }) => {

  const [hasSetPosition, setHasSetPosition] = useState(false);
  const slider = useRef();

  useEffect(() => {
    if (slider.current && !hasSetPosition) {
      slider.current.slickGoTo(initialSlide);
      setHasSetPosition(true);
    }
  }, [initialSlide, hasSetPosition, slider]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide,
    arrow: true,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: 2,
    //       slidesToScroll: 2,
    //       infinite: true,
    //       dots: true
    //     }
    //   },
    //   {
    //     breakpoint: 648,
    //     settings: {
    //       slidesToShow: 1,
    //       slidesToScroll: 1,
    //       initialSlide: 1
    //     }
    //   }
    // ]
  };

  return (
    <Slider ref={slider} {...settings}>
      {data.map((recent) => <RecentCard recent={recent}/>)}
    </Slider>
  )
}