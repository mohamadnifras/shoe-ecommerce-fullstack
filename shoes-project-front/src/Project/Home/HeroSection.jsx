import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
  };

  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="w-[90%] max-w-[1200px]">
        <Slider {...settings}>
          <div>
            <img
              src="/shoeimages/homepage3.png"
              alt="Shoe 1"
              className="w-full h-[600px] object-cover rounded-xl"
            />
          </div>
          <div>
            <img
              src="/shoeimages/homepage2.png"
              alt="Shoe 2"
              className="w-full h-[600px] object-cover rounded-xl"
            />
          </div>
          <div>
            <img
              src="/shoeimages/homepage4.jpg"
              alt="Shoe 3"
              className="w-full h-[600px] object-cover rounded-xl"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default HeroSection;
