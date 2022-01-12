import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createOrder } from "../../helpers/userFetch";
import { isAuthenticated } from "../../helpers/authFetch";
import { emptyCart } from "../../helpers/cart";

const Checkout = ({ products, setRender = (f) => f, render = undefined }) => {
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return (
        Math.round((currentValue + nextValue.count * nextValue.price) * 100) /
        100
      );
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in here</button>
      </Link>
    );
  };

  const buy = () => {
    setData({ loading: true });

    setData({ ...data, success: true });
    const createOrderData = {
      products: products,
      amount: getTotal(products),
      address: data.address,
    };
    createOrder(userId, token, createOrderData);
    emptyCart(() => {
      setRender(!render);
      setData({ loading: false, success: true });
    });
  };

  const handleAddress = (e) => {
    setData({ ...data, address: e.target.value });
  };
  const showDropIn = () => (
    <div
      onBlur={() => setData({ ...data, error: "" })}
      className="cold-md-6 m-auto"
    >
      {products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <textarea
              className="form-control"
              required
              placeholder="Delivery Address..."
              value={data.address}
              onChange={handleAddress}
            />
          </div>
          <button onClick={buy} className="btn btn-info btn-block pt-2">
            Place Order
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your order has been successfully placed!
    </div>
  );

  const showLoading = (loading) =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container-fluid m-2">
      <h4 className="title">Your cart</h4>

      <h5>Total: ${getTotal()}</h5>
      {showLoading(data.loading)}
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
