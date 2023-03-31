import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/header";
import Meals from "./components/Meals/Meals";
import CartContextProvider from "./store/CartContextProvider";

function App() {

  const [cartVisible, setCartVisible] = useState(false);

  const cartShowHandler = () => {
    setCartVisible(true);
  }

  const cartHideHandler = () => {
    setCartVisible(false);
  }

  return (
    <CartContextProvider>
      {cartVisible && <Cart onHide={cartHideHandler}/>}
        <Header onShow={cartShowHandler}></Header>
        <main>
          <Meals/>
        </main>
    </CartContextProvider>
  );
}

export default App;
