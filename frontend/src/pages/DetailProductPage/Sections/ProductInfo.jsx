import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/thunkFunctions";
const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(addToCart({ productId: product._id }));
  };

  return (
    <div>
      <p className="text-xl text-bold"> Details</p>
      <ul>
        <li>
          <span className="font-semibold text-gray-900">
            {product.price} won
          </span>{" "}
          <span className="font-semibold text-gray-900">
            {product.sold} sold
          </span>{" "}
          <span className="font-semibold text-gray-900">
            description: {product.description}
          </span>
        </li>
      </ul>

      <div className="'mt-3">
        <button
          onClick={handleClick}
          className="w-full px-4 py-2 text-white bg-black hover:bg-gray-700 rounded-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
