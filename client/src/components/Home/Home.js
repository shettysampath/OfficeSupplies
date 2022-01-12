import React, { useState, useEffect } from "react";
import Card from "./Category_Card";
import Pagination from "react-js-pagination";
import { getCategories } from "../../helpers/adminFetch";

const Home = () => {
  const limit = 6;
  const [categories, setCategories] = useState([]);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePage, setCurrentPage] = useState(1);
  const indexOfLastTodo = activePage * limit;
  const indexOfFirstTodo = indexOfLastTodo - limit;
  const currentTodos = categories.slice(indexOfFirstTodo, indexOfLastTodo);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setLoading(false);
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const showError = () => error && <h2>Fail to load!</h2>;

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      {showError()}
      <h4 className="title pt-3 pb-3">Categories</h4>
      {showLoading()}

      <div className="container-fluid row m-0 p-0 card-container">
        {currentTodos.map((category, i) => (
          <div className="col-4 mb-3" key={i}>
            <Card category={category} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={limit}
          totalItemsCount={categories.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
};

export default Home;
