import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createCategory } from "../../helpers/adminFetch";
import { isAuthenticated } from "../../helpers/authFetch";

const CreateCategory = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    name: "",
    photo: "",
    formData: new FormData(),
  });

  const { name, photo, formData } = values;

  const { user, token } = isAuthenticated();
  const handleChange = (name) => (event) => {
    if (name === "photo") console.log(event.target.files[0]);
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    //request an API call
    console.log("Name: ", name, "Photo: ", photo);
    console.log(formData);
    createCategory(user._id, token, formData).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setValues({
          ...values,
          name: "",
          photo: "",
        });
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label htmlFor="">Category Name</label>
        <input
          type="text"
          className="form-control"
          autoFocus
          value={name}
          onChange={handleChange("name")}
          required
        />
      </div>
      <label htmlFor="">Post Photo</label>
      <div className="form-group">
        <label className="btn ">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
          />
        </label>
      </div>
      <Link
        to="/admin/dashboard"
        className="btn btn-outline-warning float-left"
      >
        Back
      </Link>
      <button className="btn btn-outline-primary float-right">Create</button>
    </form>
  );

  const showSuccess = () => {
    if (success)
      return <h6 className="text-info">{name} is created successfully!</h6>;
  };

  const showError = () => {
    if (error) return <h3 className="text-danger">{error}</h3>;
  };

  return (
    <div className="container w-50">
      <h4 className="title m-3 text-center">New Category</h4>
      {showError()}
      {showSuccess()}
      {newCategoryForm()}
    </div>
  );
};

export default CreateCategory;
