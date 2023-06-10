import { Link } from "react-router-dom";

function FavoritesInfo() {
  return (
    <div className="products__favorites-box">
      <img height={70} src="./img/sad-smile.png" alt="Грустный смайл" />
      <h4>У вас нет заказов</h4>
      <p>
        <span>Вы нищеброд?</span> Оформите хотя бы один заказ.
      </p>
      <Link to="/">
        <button>
          <img
            width={13}
            height={12}
            src="./img/icon-arrow-left.svg"
            alt="Arrow"
          />
          Вернуться назад
        </button>
      </Link>
    </div>
  );
}

export default FavoritesInfo;
