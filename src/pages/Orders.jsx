import Product from "../components/product";
import productStyles from "../components/product/Product.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Orders(props) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/orders");
        setOrders(data.reduce((acc, obj) => [...acc, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка");
        console.log(error);
      }
    })();
  }, []);
  return (
    <section className="products">
      <div className="products__top">
        <h2>Мои заказы</h2>
      </div>
      <ul className={productStyles.products__list}>
        {(isLoading ? [...Array(12)] : orders).map((item) => (
          <Product
            title={item && item.title}
            price={item && item.price}
            urlImg={item && item.imageUrl}
            id={item && item.id}
            key={item && item.id}
            loading={isLoading}
          />
        ))}
      </ul>
    </section>
  );
}

export default Orders;
