import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

import { isAuthenticated } from "../../helpers/authFetch";
import { getPurchaseHistory } from "../../helpers/user";

const UserDashboard = () => {
  const [history, setHistory] = useState([]);

  const {
    user: { name, email, _id },
  } = isAuthenticated();
  const token = isAuthenticated().token;

  useEffect(() => {
    getPurchaseHistory(_id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  }, []);

  const userLinks = () => {
    return (
      <div className="card ">
        <h5 className="card-header bg-dark text-white">User Links</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mt-5 card-dashboard">
        <h5 className="card-header bg-dark text-white">User Information</h5>
        <ul className="list-group">
          <li className="list-group-item">Name:&nbsp;{name}</li>
          <li className="list-group-item">Email:&nbsp;{email}</li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (history) => {
    return (
      <div className="card mb-5 border-0">
        <h5 className="card-header bg-dark text-white">Purchase history</h5>
        <ul className="list-group ">
          <li className="list-group-item">
            {history.map((h) => {
              return (
                <div key={h._id} className="shadow p-3 mb-5 bg-white rounded">
                  <div className="d-flex justify-content-between">
                    <h6>
                      <strong>Order Id: {h._id}</strong>
                    </h6>
                    <h6>Ordered {moment(h.createdAt).fromNow()}</h6>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h6>
                      <strong>Total Products:&nbsp;{h.products.length}</strong>
                    </h6>
                    <h6>
                      <strong>Total Amount:&nbsp;${h.amount}</strong>
                    </h6>
                  </div>

                  {h.products.map((p) => {
                    return (
                      <div key={p._id}>
                        <hr />
                        <p>Name: {p.name}</p>
                        <p>Price: ${p.price}</p>
                        <p>Quantity: {p.count}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="row  p-5  m-0 card-container justify-content-center">
      <div className="col-5 ">
        {userLinks()} {userInfo()}
      </div>
      <div className="col-7">{purchaseHistory(history)}</div>
    </div>
  );
};

export default UserDashboard;
