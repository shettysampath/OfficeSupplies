import React from "react";
import { isAuthenticated } from "../../helpers/authFetch";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role, _id },
  } = isAuthenticated();

  const adminLinks = () => {
    return (
      <div className="card bg-dark">
        <h4 className="card-header text-white">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>

          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              View Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card bg-dark mb-5">
        <h3 className="card-header  text-white">Profile</h3>
        <ul className="list-group">
          <li className="list-group-item">Name:&nbsp;{name}</li>
          <li className="list-group-item">Email:&nbsp;{email}</li>

          <li className="list-group-item">
            <Link className="nav-link mx-0" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="row p-5 card-container">
      <div className="col-6">{adminInfo()}</div>
      <div className="col-6">{adminLinks()}</div>
    </div>
  );
};

export default AdminDashboard;
