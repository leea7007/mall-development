import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import { useNavigate } from "react-router-dom";

const CardItem = ({ product }) => {
  const navigate = useNavigate();

  const handleclick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="border-[1px] border-gray-300" onClick={handleclick}>
      <Link>
        <ImageSlider images={product.images} />
        <p>{product.title}</p>
        <p>{product.continents}</p>
        <p className="p-1 text-xs text-gray-500"> {product.price}원 </p>
      </Link>
    </div>
  );
};

export default CardItem;
