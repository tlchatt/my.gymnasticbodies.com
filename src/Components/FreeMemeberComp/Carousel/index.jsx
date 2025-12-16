import React from 'react';
import Slider from "react-slick";

const CenterMode = props => {
  const settings = {
    dots: true,
    centerMode: true,
    slidesToShow: 1,
    infinite: false,
    arrows: false,
    centerPadding: "0px",
    initialSlide: props.currentDateIndex,
    adaptiveHeight: true,
  };

  return (
    <Slider
      beforeChange={ (oldIndex, newIndex) => props.changeCard ? props.changeCard(newIndex) : null }
      {...settings}
    >
      {props.children}
    </Slider>
  );
}

export default CenterMode;
