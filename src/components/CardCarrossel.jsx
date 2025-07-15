import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import photo from "../assets/Banner-1.jpg";

// https://react-slick.neostack.com/

const CardCarrossel = () => {
  var settings = {
    speed: 500,
    className: "",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  return (
    <Slider {...settings}>
      <div>
        <img src={photo} alt="title" />
      </div>
      <div>
        <img src={photo} alt="title" />
      </div>
      <div>
        <img src={photo} alt="title" />
      </div>
      <div>
        <img src={photo} alt="title" />
      </div>
      <div>
        <img src={photo} alt="title" />
      </div>
      <div>
        <img src={photo} alt="title" />
      </div>
    </Slider>
  );
};

export default CardCarrossel;
