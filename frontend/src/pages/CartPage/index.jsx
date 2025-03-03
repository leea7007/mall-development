import React, { useEffect, useState } from "react";
import { getCartItems } from "../../store/thunkFunctions";
import { useDispatch, useSelector } from "react-redux";
import CartTable from "./Sections/CartTable";

const CartPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let cartItemIds = [];
    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });

      const body = {
        cartItemIds,
        userCart: userData.cart,
      };
      console.log("body", body);
      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    calculateTotal(cartDetail);
  }, [cartDetail]);

  const calculateTotal = () => {
    console.log("cartD", cartDetail);
    let total = 0;
    cartDetail.map((item) => (total += item.price * item.quantity));
    setTotal(total);
  };

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">my Cart</h2>
      </div>

      {cartDetail?.length > 0 ? (
        <>
          <CartTable
            products={cartDetail}
            onRemoveHandleItem={handleRemoveCartItem}
          />
          <div className="mt-10">
            <p>
              <span className="font-bold"> sum:</span>
              {total} won
            </p>
            <button className="text-white bg-black hover:bg-gray-500 rounded-md px-4 py-2 mt-5">
              Payment
            </button>
          </div>
        </>
      ) : (
        <p>cart is empty</p>
      )}
    </section>
  );
};

export default CartPage;
