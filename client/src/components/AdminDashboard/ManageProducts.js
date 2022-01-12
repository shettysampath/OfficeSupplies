import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteProduct, getAdminProducts } from "../../helpers/adminFetch";
import { isAuthenticated } from "../../helpers/authFetch";
import ProductImages from "./AdminProductImages";
import Pagination from "react-js-pagination";

const ManageProducts = () => {
  const limit = 6;
  const [products, setProducts] = useState([]);
  const [activePage, setCurrentPage] = useState(1);

  const indexOfLastTodo = activePage * limit;
  const indexOfFirstTodo = indexOfLastTodo - limit;
  const currentTodos = products.slice(indexOfFirstTodo, indexOfLastTodo);

  const { user, token } = isAuthenticated();

  const loadProducts = () =>
    getAdminProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data.products);
      }
    });

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProductButton = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container col-md-6">
      <h4 className="title m-3 text-center">Manage Products</h4>
      <p className="d-flex justify-content-end">
        Total products: {products.length}
      </p>
      <div className="row">
        <div className="col-md-12">
          <ul className="list-group">
            {currentTodos.map((p) => (
              <li className="list-group-item d-flex" key={p._id}>
                <div className="d-flex col-md-8">
                  <ProductImages item={p} />
                  <strong className="float-left text-wrap">{p.name}</strong>
                </div>
                <div className="d-flex float-right col-md-4">
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="btn btn-primary m-2">Update</span>
                  </Link>

                  {!p.isDeleted ? (
                    <Link to={`/admin/products`}>
                      <span
                        className="btn btn-danger m-2"
                        style={{ height: "40px" }}
                        onClick={() => deleteProductButton(p._id)}
                      >
                        Delete
                      </span>
                    </Link>
                  ) : (
                    <span
                      className="btn btn-secondary m-2"
                      style={{ height: "40px" }}
                    >
                      Delete
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pagination">
        <Pagination
          className="pagination"
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={products.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
      <div className="row p-3 ms-2">
        <Link
          to="/admin/dashboard"
          className="btn btn-outline-warning float-left"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default ManageProducts;
