import { useState } from "react";
import Info from "./Info";
import { AppContext } from "../App";
import { useContext } from "react";
import axios from "axios";

function SideCart(props) {
  const { setCartItems, cartItems } = useContext(AppContext);
  const [numberOfOrder, setNumberOfOrder] = useState(null);
  const [isCartCompleted, setIsCartCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onClickOrder() {
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:3001/orders", {
        items: cartItems,
      });
      for (let i = 0; i < Array.length; i++) {
        let item = cartItems[i];
        await axios.delete("http://localhost:3001/orders/" + item.id);
      }

      // cartItems.map((item) =>
      //   axios.delete(`http://localhost:3001/cart/${item.id}`)
      // );
      setNumberOfOrder(data.id);
      setCartItems([]);
      setIsCartCompleted(true);
    } catch (error) {
      alert("Заказ не удалось сделать :(");
    }
    setIsLoading(false);
  }

  return (
    <div className="shadow">
      <div className="side-cart">
        <div className="side-cart__box">
          <h3>Корзина</h3>
          <img
            className="side-cart__img"
            onClick={props.onClick}
            width={32}
            height={32}
            src="./img/icon-close.svg"
            alt="Close button"
          />
        </div>
        {props.cartItems.length > 0 ? (
          <>
            <ul className="side-cart__list">
              {props.cartItems.map((item) => (
                <li key={item.id}>
                  <img
                    width={70}
                    height={70}
                    src={item.imageUrl}
                    alt="Product"
                  />
                  <h4>
                    {item.title}
                    <span>{item.price} грн.</span>
                  </h4>
                  <img
                    onClick={() => props.onDelete(item.id)}
                    className="side-cart__img"
                    width={32}
                    height={32}
                    src="./img/icon-close.svg"
                    alt="Close button"
                  />
                </li>
              ))}
            </ul>
            <ul className="side-cart__result">
              <li>
                <span className="side-cart__result-text">Итого:</span>
                <div></div>
                <span className="side-cart__result-sum">21 498 грн.</span>
              </li>
              <li>
                <span className="side-cart__result-text">Налог 5%:</span>
                <div></div>
                <span className="side-cart__result-sum">1074 грн.</span>
              </li>
            </ul>
            <button
              onClick={() => onClickOrder()}
              className="button"
              disabled={isLoading}
            >
              Оформить заказ
              <img
                width={13}
                height={12}
                src="./img/icon-arrow.svg"
                alt="Arrow"
              />
            </button>
          </>
        ) : (
          <Info
            title={isCartCompleted ? "Заказ оформлен!" : "Корзина пустая"}
            img={
              isCartCompleted
                ? "./img/comleted-cart.png"
                : "./img/empty-cart.png"
            }
            text={
              isCartCompleted
                ? `Ваш заказ #${numberOfOrder} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
          />
        )}
      </div>
    </div>
  );
}

export default SideCart;
