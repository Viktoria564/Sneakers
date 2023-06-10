import Header from "./components/Header";
import SideCart from "./components/SideCart/SideCart";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";
import { createContext } from "react";
import Orders from "./pages/Orders";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSideCart, setIsSideCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse, cartResponse, favoritesResponse] =
          await Promise.all([
            axios.get("http://localhost:3001/items"),
            axios.get("http://localhost:3001/cart"),
            axios.get("http://localhost:3001/favorites"),
          ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavoriteItems(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка!");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  function addProductInCart(obj) {
    try {
      if (cartItems.find((item) => item.id === obj.id)) {
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        axios.post("http://localhost:3001/cart", obj);
      }
    } catch (error) {
      alert("Ошибка!");
      console.error(error);
    }
  }

  function addSearchValue(e) {
    setSearchValue(e.target.value);
  }

  function deleteCartItems(id) {
    try {
      axios.delete(`http://localhost:3001/cart/${id}`);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка!");
      console.error(error);
    }
  }

  async function addFavoriteItem(obj) {
    try {
      if (favoriteItems.find((item) => item.id === obj.id)) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        setFavoriteItems((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "http://localhost:3001/favorites",
          obj
        );
        setFavoriteItems([...favoriteItems, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  }

  function getItemToCart(id) {
    return cartItems.some((obj) => obj.id === id);
  }

  return (
    <>
      <AppContext.Provider
        value={{
          items,
          cartItems,
          favoriteItems,
          getItemToCart,
          setIsSideCart,
          setCartItems,
        }}
      >
        <SideCart
          cartItems={cartItems}
          onClick={() => setIsSideCart(false)}
          onDelete={deleteCartItems}
          opened={isSideCart}
        />
        <div className="container">
          <Header onClickCart={() => setIsSideCart(true)} />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Home
                  items={items}
                  searchValue={searchValue}
                  addSearchValue={addSearchValue}
                  addProductInCart={addProductInCart}
                  addFavoriteItem={addFavoriteItem}
                  setSearchValue={setSearchValue}
                  isLoading={isLoading}
                />
              }
            ></Route>
          </Routes>
          <Routes>
            <Route
              path="/favorites"
              element={
                <Favorites
                  addProductInCart={addProductInCart}
                  addFavoriteItem={addFavoriteItem}
                />
              }
            ></Route>
          </Routes>
          <Routes>
            <Route path="/orders" element={<Orders />}></Route>
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
