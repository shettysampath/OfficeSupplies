import React, { useState, useEffect } from "react";
import { getProductsBySearch } from "../../helpers/userFetch";
import Card from "./Product_Card";
import Pagination from "react-js-pagination";

const ProductsPage = ({ match }) => {
  const [data, setData] = useState({
    results: [],
    searched: false,
  });

  const id = match.params.categoryId;
  const { results, searched } = data;
  const limit = 8;

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activePage, setCurrentPage] = useState(1);
  const indexOfLastTodo = activePage * limit;
  const indexOfFirstTodo = indexOfLastTodo - limit;
  const currentTodos = results.slice(indexOfFirstTodo, indexOfLastTodo);

  useEffect(() => {
    getProductsBySearch({
      search: "",
      category: id,
    }).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setData({ ...data, results: response, searched: true });
        setLoading(false);
      }
    });
  }, []);

  const showError = () => error && <h2>Fail to load!</h2>;
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Products`;
    }
    if (searched && results.length < 1) {
      return `No product found!`;
    }
  };
  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      {showError()}
      {showLoading()}

      <h4 className="mt-3 mb-3">{searchMessage(searched, results)}</h4>
      <div className="container-fluid row m-0 p-0 card-container">
        {currentTodos.map((product, i) => (
          <div className="col-3 mb-3" key={i}>
            <Card product={product} />
          </div>
        ))}
      </div>
      {searched && results.length !== 0 ? (
        <div className="pagination">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={limit}
            totalItemsCount={results.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ProductsPage;
