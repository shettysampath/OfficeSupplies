import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  updateProduct,
  getProduct,
} from "../../helpers/adminFetch";
import { isAuthenticated } from "../../helpers/authFetch";

const UpdateProduct = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    // shipping: "",
    quantity: "",
    photo: "",
    isDeleted: false,
    loading: false,
    error: "",
    updatedProduct: "",

    formData: "",
  });

  const { user, token } = isAuthenticated();
  const {
    name,
    description,
    price,
    categories,
    quantity,
    isDeleted,
    loading,
    error,
    updatedProduct,
    formData,
  } = values;

  const loadProduct = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          // shipping: data.shipping,
          quantity: data.quantity,
          isDeleted: data.isDeleted,
          formData: new FormData(),
        });
        initCategories();
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    loadProduct(match.params.productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(user._id, token, match.params.productId, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            photo: "",
            price: "",
            quantity: "",
            isDeleted: false,
            loading: false,
            updatedProduct: data.name,
          });
        }
      }
    );
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          step="0.01"
          className="form-control"
          value={price}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select onChange={handleChange("category")} className="form-control">
          <option>Please select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Deleted</label>

        <select onChange={handleChange("isDeleted")} className="form-control">
          <option>Please select</option>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <button className="btn btn-outline-primary float-right mb-3">
        Update
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: updatedProduct ? "" : "none" }}
    >
      <h6 className="text-info">
        {`${updatedProduct}`} is updated successfully!
      </h6>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="container w-50">
      <h1 className="title p-2 text-center">Update Product</h1>
      {showLoading()}
      {showSuccess()}
      {showError()}
      {newPostForm()}
      <div className="row p-3 ms-2 d-flex justify-content-between">
        <Link
          to="/admin/products"
          className="btn btn-outline-warning float-left mb-3"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default UpdateProduct;
