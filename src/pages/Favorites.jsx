import Product from "../components/product";
import productStyles from "../components/product/Product.module.scss";

function Favorites(props) {
  return (
    <section className="products">
      <div className="products__top">
        <h2>Мои закладки</h2>
      </div>
      <ul className={productStyles.products__list}>
        {props.items.map((item) => (
          <Product
            title={item.title}
            price={item.price}
            urlImg={item.imageUrl}
            onClick={() => props.addProductInCart(item)}
            onFavorite={() => props.addFavoriteItem(item)}
            favorited={true}
            key={item.id}
          />
        ))}
      </ul>
    </section>
  );
}

export default Favorites;
