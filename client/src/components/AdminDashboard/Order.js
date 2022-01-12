import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  getOrders,
  getStatusValues,
  updateOrderStatus,
} from "../../helpers/adminFetch";
import { isAuthenticated } from "../../helpers/authFetch";
import Pagination from "react-js-pagination";

const Orders = () => {
  const limit = 6;

  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const [activePage, setCurrentPage] = useState(1);

  const indexOfLastTodo = activePage * limit;
  const indexOfFirstTodo = indexOfLastTodo - limit;
  const currentTodos = orders.slice(indexOfFirstTodo, indexOfLastTodo);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    getOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();

    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  }, []);

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((res) => {
      if (res.error) {
        console.log("Status update failed");
      } else {
        loadOrders();
      }
    });
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const showStatus = (order) => (
    <div className="form-group">
      <h6 className=" mb-2">Status: {order.status}</h6>
      <select
        className="form-control"
        onChange={(e) => handleStatusChange(e, order._id)}
      >
        <option>Update Status</option>
        {statusValues.map((status, i) => (
          <option key={i} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <p className="d-flex justify-content-end  p-2 text-center mt-2 title">
        Total orders: {orders.length}
      </p>
      {currentTodos.map((o) => {
        return (
          <div className="row m-2 mb-5" key={o._id}>
            <div className="col-4">
              <h4 className="mb-3 ">
                <span className="">Order ID: {o._id}</span>
              </h4>

              <ul className="list-group mb-2">
                <li className="list-group-item">{showStatus(o)}</li>

                <li className="list-group-item">Ordered by: {o.user.name}</li>
                <li className="list-group-item">
                  Ordered {moment(o.createdAt).fromNow()}
                </li>
                <li className="list-group-item">
                  Delivery address: {o.address}
                </li>
              </ul>
            </div>

            <div className="col-8 m-auto shadow p-3 mb-5 bg-white rounded">
              <h6 className="mb-3"> Total Amount:&nbsp;${o.amount}</h6>

              {o.products.map((p) => (
                <div key={p._id}>
                  <hr />
                  <p>Name: {p.name}</p>
                  <p>Price: ${p.price}</p>
                  <p>Count: {p.count}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      <div className="pagination">
        <Pagination
          className="pagination"
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={orders.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
};

export default Orders;
