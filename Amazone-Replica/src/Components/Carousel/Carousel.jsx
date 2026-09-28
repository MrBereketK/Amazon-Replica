import React from "react";
import { Carousel } from "react-responsive-carousel";

import { images } from "./Image/data";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";

function CarouselEffect() {
  return (
    <div className="carousel">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        interval={3000}
        stopOnHover={false}
      >
        {images.map((imageLink, index) => (
          <div key={index}>
            <img
              src={imageLink}
              alt={`banner-${index}`}
              className="carousel__image"
            />
          </div>
        ))}
      </Carousel>

      <div className="hero_image"></div>
    </div>
  );
}

export default CarouselEffect;
