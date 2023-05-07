import Header from "./components/Header";
import SideCart from "./components/SideCart";
import Home from "./pages/Home";
import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isSideCart, setIsSideCart] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/items").then((res) => setItems(res.data));
    axios
      .get("http://localhost:3001/cart")
      .then((res) => setCartItems(res.data));
    axios
      .get("http://localhost:3001/favorites")
      .then((res) => setFavoriteItems(res.data));
  }, []);

  function addProductInCart(obj) {
    axios.post("http://localhost:3001/cart", obj);
    console.log(obj.id);
    setCartItems((prev) => [...prev, obj]);
  }

  function addSearchValue(e) {
    setSearchValue(e.target.value);
  }

  function deleteCartItems(id) {
    console.log(id);
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  function addFavoriteItem(obj) {
    if (favoriteItems.find((item) => item.id === obj.id)) {
      axios.delete(`http://localhost:3001/favorites/${obj.id}`);
    } else {
      axios.post("http://localhost:3001/favorites", obj);
      setFavoriteItems([...favoriteItems, obj]);
    }
  }

  return (
    <>
      {isSideCart && (
        <SideCart
          cartItems={cartItems}
          onClick={() => setIsSideCart(false)}
          onDelete={deleteCartItems}
        />
      )}
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
              />
            }
          ></Route>
        </Routes>
        <Routes>
          <Route
            path="/favorites"
            element={
              <Favorites
                items={favoriteItems}
                addProductInCart={addProductInCart}
                addFavoriteItem={addFavoriteItem}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
