import { AppContext } from "../App";
import { useContext } from "react";

function Info({ img, title, text }) {
  const { setIsSideCart } = useContext(AppContext);

  return (
    <div className="side-cart__empty-box">
      <img height={120} src={img} alt="Пустая корзина" />
      <h4>{title}</h4>
      <p>{text}</p>
      <button onClick={() => setIsSideCart(false)}>
        <img
          width={13}
          height={12}
          src="./img/icon-arrow-left.svg"
          alt="Arrow"
        />
        Вернуться назад
      </button>
    </div>
  );
}

export default Info;
