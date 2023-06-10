import { useContext } from "react";
import { AppContext } from "../App";

export const useCart = () => {
  const { setCartItems, cartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, item) => item.price + sum, 0);

  return { setCartItems, cartItems, totalPrice };
};
