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
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill mb-2">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill mb-2">Out of Stock</span>
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

  // update cart functionality

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
    <div className="container">
      <h1 className=" col-md-12 p-3">{product.name}</h1>
      <div className="row d-flex">
        <div className="col-md-7 ">
          {shouldRedirect(redirect)}
          <ProductImages item={product} />
        </div>
        <div className="col-md-5 card-body shadow p-3 mb-5 bg-white rounded">
          <p>
            <strong>About this product: </strong>
          </p>
          <p>{product.description}</p>
          <hr />
          <p>Price: ${product.price}</p>
          <hr />
          <p>Category: {product.category && product.category.name}</p>
          <hr />
          <div>
            {showViewProductButton(showViewButton)}

            {showAddToCart(showAddToCartButton)}

            {showRemoveButton(showRemoveProductButton)}
          </div>
          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    </div>
  );
};

export default Card;
