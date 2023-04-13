function SideCart(props) {
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
        <ul className="side-cart__list">
          {props.cartItems.map((item, i) => (
            <li key={i}>
              <img width={70} height={70} src={item.imageUrl} alt="Product" />
              <h4>
                {item.title}
                <span>{item.price} грн.</span>
              </h4>
              <img
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
        <button className="button">
          Оформить заказ
          <img width={13} height={12} src="./img/icon-arrow.svg" alt="Arrow" />
        </button>
      </div>
    </div>
  );
}

export default SideCart;
