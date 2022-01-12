import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductImages from "../ProductsPage/Product_Images";
import { updateItem, removeItem } from "../../helpers/cart";

const Card = ({
  product,
  showViewButton = true,
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

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
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
            value={count > 1 ? count : product.count}
            onChange={handleChange(product._id, quantity)}
            max={quantity}
          />
        </div>
      )
    );
  };

  return (
    <div className="card h-100 text-center">
      <div className="card-header">{product.name}</div>
      <div className="card-image">
        {shouldRedirect(redirect)}
        <ProductImages item={product} />
      </div>
      <div className="column card-body">
        <h5>${product.price}</h5>
        <div>
          {showViewProductButton(showViewButton)}

          {showRemoveButton(showRemoveProductButton)}
        </div>
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

export default Card;
