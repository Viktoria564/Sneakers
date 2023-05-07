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
            <button className="button">
              Оформить заказ
              <img
                width={13}
                height={12}
                src="./img/icon-arrow.svg"
                alt="Arrow"
              />
            </button>{" "}
          </>
        ) : (
          <div className="side-cart__empty-box">
            <img
              width={120}
              height={120}
              src="./img/empty-cart.png"
              alt="Пустая корзина"
            />
            <h4>Корзина пустая</h4>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={props.onClick}>
              <img
                width={13}
                height={12}
                src="./img/icon-arrow-left.svg"
                alt="Arrow"
              />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideCart;
