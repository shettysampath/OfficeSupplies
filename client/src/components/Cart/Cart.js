import React, { useState, useEffect } from "react";
import { getCart } from "../../helpers/cart";
import Cart_Card from "./Cart_Card";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [render]);

  const showItems = (items) => {
    return (
      <div className="container ">
        <div className="row">
          {items.map((product) => (
            <div className="col-md-6 mb-3" key={product._id}>
              <Cart_Card
                product={product}
                showAddToCartButton={false}
                showRemoveProductButton={true}
                cartUpdate={true}
                setRender={setRender}
                render={render}
              />
            </div>
          ))}{" "}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <div>
      <h2>Your cart is currently empty.</h2>
      <Link to="/">Continue shopping</Link>
    </div>
  );

  return (
    <div className="container d-flex m-3">
      <div className="mt-4 col-md-8">
        {items.length > 0 ? showItems(items) : noItemsMessage()}
      </div>
      <div className="col-md-4">
        <Checkout products={items} setRender={setRender} render={render} />
      </div>
    </div>
  );
};

export default Cart;
