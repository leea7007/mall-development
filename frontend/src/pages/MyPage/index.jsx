import React, { useEffect } from "react";
import { getCartItems } from "../../store/thunkFunctions";

const CartPage = () => {
  const userData = useSelector((state) => state.user?.userData);

  useEffect(() => {
    let cartItemIds = [];
    if (userData.cart.length > 0 && userData?.cart) {
      userData.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });

      const body = {
        cartItemIds,
        userCart: userData.cart,
      };

      dispatchEvent(getCartItems(body));
    }
  }, [dispatch, userData]);
  return <div> cart page </div>;
};

export default CartPage;
