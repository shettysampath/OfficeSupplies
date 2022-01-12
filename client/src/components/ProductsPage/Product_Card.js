import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductImages from "./Product_Images";
import { addItem, updateItem, removeItem } from "../../helpers/cart";

const Card = ({
  product,
  showViewButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRender = (f) => f,
  render = undefined,
}) => {
  const [count, setCount] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const showViewProductButton = (showViewButton) => {
    return (
      showViewButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2">View</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (showAddToCartButton) => {
    return showAddToCartButton && product.quantity >= 1 ? (
      <button className="btn btn-outline-success mt-2 mb-2" onClick={addToCart}>
        Add to cart
      </button>
    ) : (
      <button className="btn  btn-secondary mt-2 mb-2" disabled={true}>
        Out of Stock
      </button>
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          className="btn btn-outline-danger mt-2 mb-2"
          onClick={() => {
            removeItem(product._id, () => setRedirect(true));
            setRender(!render);
          }}
        >
          Remove
        </button>
      )
    );
  };

  const handleChange = (productId, quantity) => (e) => {
    setRender(!render);
    setCount(e.target.value < 1 ? 1 : e.target.value);
    if (e.target.value >= 1 && e.target.value <= quantity) {
      updateItem(productId, e.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    const { quantity } = product;
    return (
      cartUpdate && (
        <div className="input-group mt-1">
          <div className="input-group-prepend">
            <span className="input-group-text">Quantity</span>
          </div>
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleChange(product._id, quantity)}
            max={quantity}
          />
        </div>
      )
    );
  };

  return (
    <div className="card h-100 text-center">
      <Link
        to={`/product/${product._id}`}
        className="card text-decoration-none"
      >
        <div className="card-img-fluid">
          {shouldRedirect(redirect)}
          <ProductImages item={product} />
        </div>
      </Link>
      <div className="column card-body">
        <p>{product.name}</p>
        <h5>${product.price}</h5>
        <div>
          {showViewProductButton(showViewButton)}

          {showAddToCart(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}
        </div>
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
