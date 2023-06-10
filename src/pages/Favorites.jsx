import Product from "../components/product";
import productStyles from "../components/product/Product.module.scss";
import { AppContext } from "../App";
import { useContext } from "react";
import FavoritesInfo from "../components/FavoritesInfo";
import { useState } from "react";
import { useEffect } from "react";

function Favorites(props) {
  const { favoriteItems } = useContext(AppContext);

  return (
    <section className="products">
      {favoriteItems.length > 0 ? (
        <>
          <div className="products__top">
            <h2>Мои закладки</h2>
          </div>
          <ul className={productStyles.products__list}>
            {favoriteItems.map((item) => (
              <Product
                title={item.title}
                price={item.price}
                urlImg={item.imageUrl}
                id={item.id}
                onClick={() => props.addProductInCart(item)}
                onFavorite={() => props.addFavoriteItem(item)}
                favorited={true}
                key={item.id}
              />
            ))}
          </ul>
        </>
      ) : (
        <FavoritesInfo />
      )}
    </section>
  );
}

export default Favorites;
