import React, { useState, useEffect } from "react"; // useState와 useEffect 임포트
import ImageGallery from "react-image-gallery";

const ProductImage = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      let images = []; // 로컬 배열로 저장
      product.images.map((imageName) => {
        images.push({
          original: `${import.meta.env.VITE_SERVER_URL}/uploads/${imageName}`,
          thumbnail: `${import.meta.env.VITE_SERVER_URL}/uploads/${imageName}`,
        });
      });
      setImages(images); // 상태를 업데이트
    }
  }, [product]); // product가 변경될 때마다 실행

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
};

export default ProductImage;
