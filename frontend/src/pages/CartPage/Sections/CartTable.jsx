import React from "react";

const CartTable = ({ products, onRemoveItem }) => {
  if (!products || products.length === 0) {
    return <p>장바구니가 비었어요.</p>;
  }

  const renderCartImage = (images) => {
    if (images && images.length > 0) {
      return `${import.meta.env.VITE_SERVER_URL}/uploads/${images[0]}`;
    } else {
      return "/default-image.png"; // 기본 이미지 경로
    }
  };

  const renderItems =
    products.length > 0 &&
    products.map((product) => (
      <tr key={product._id}>
        <td>
          <img
            className="w-[70px"
            alt="product"
            src={renderCartImage(product.images)}
          />
        </td>
        <td>{product.quantity} 개</td>
        <td>{product.price} won</td>
        <td>
          <button onClick={() => onRemoveItem(product._id)}>delete</button>
        </td>
      </tr>
    ));

  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="border-[1px]">
        <tr>
          <th> Image </th> <th> quantity </th>
          <th> price </th>
          <th> delete </th>
        </tr>
      </thead>

      <tbody>{renderItems}</tbody>
    </table>
  );
};

export default CartTable;
