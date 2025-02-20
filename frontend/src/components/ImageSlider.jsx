import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ImageSlider = ({ images = [] }) => {
  if (images.length === 0) {
    return <div>이미지가 없습니다.</div>;
  }

  const isSingleImage = images.length === 1;

  const handleImageClick = (image) => {
    // 이미지 클릭 시 이동할 링크 만들기 (예: /product/<id>)
    window.location.href = `/product/${productId}`;
  };

  return (
    <Carousel
      autoPlay={!isSingleImage}
      showThumbs={false}
      infiniteLoop
      interval={10000}
    >
      {images.map((image) => (
        <div key={image}>
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/uploads/${image}`}
            alt={image}
            className="w-full max-w-[150px] object-cover"
          />
        </div>
      ))}
      <div></div>
    </Carousel>
  );
};

export default ImageSlider;
