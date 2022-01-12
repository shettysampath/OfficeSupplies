import axios from "axios";
import queryString from "query-string";

export const getProductsBySearch = (params) => {
  const query = queryString.stringify(params);

  return fetch(`http://localhost:5000/api/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProducts = async (sortBy) => {
  const res = await axios.get(
    `http://localhost:5000/api/products?sortBy=${sortBy}&order=desc`
  );
  return {
    data: res.data.products,
  };
};

export const getSingleProduct = (productId) => {
  return fetch(`http://localhost:5000/api/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
  return fetch(`http://localhost:5000/api/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: createOrderData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
