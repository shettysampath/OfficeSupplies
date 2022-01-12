import React, { useState, useEffect } from "react";
import { getCategories } from "../../helpers/adminFetch";
import { getProductsBySearch } from "../../helpers/userFetch";
import Card from "../ProductsPage/Product_Card";
import Pagination from "react-js-pagination";

const Search = () => {
  const [data, setData] = useState({
    category: "",
    search: "",
    results: [],
    searched: false,
  });
  const limit = 6;
  const { category, search, results, searched } = data;
  const [categories, setCategories] = useState([]);
  const [activePage, setCurrentPage] = useState(1);

  const indexOfLastTodo = activePage * limit;
  const indexOfFirstTodo = indexOfLastTodo - limit;
  const currentTodos = results.slice(indexOfFirstTodo, indexOfLastTodo);

  useEffect(() => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });

    getProductsBySearch({
      search: search || "",
      category: category || "All",
    }).then((response) => {
      console.log(response);
      if (response.error) {
      } else {
        setData({ ...data, results: response, searched: true });
      }
    });
  }, []);

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value });
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const searchSubmit = (event) => {
    event.preventDefault();

    getProductsBySearch({
      search: search || "",
      category: category || "All",
    }).then((response) => {
      if (response.error) {
        console.log(response.error);
      } else {
        setData({ ...data, results: response, searched: true });
      }
    });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No product found!`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div className="mt-3 text-center">
        <p className="mt-3 mb-3 d-flex justify-content-end">
          {searchMessage(searched, results)}
        </p>
        <div className="row card-container">
          {currentTodos.map((product, i) => (
            <div className="col-4 mb-3" key={i}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container ">
      <div className="m-2">
        <div className="d-flex" style={{ height: "40px" }}>
          <form onSubmit={searchSubmit}>
            <span className="input-group-text" style={{ height: "40px" }}>
              <div className="input-group d-flex input-group-sm">
                <div className="input-group-prepend ">
                  <select
                    className="btn mr-2"
                    onChange={handleChange("category")}
                  >
                    <option value="All">All</option>
                    {categories.map((c, i) => (
                      <option key={i} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  type="search"
                  className="form-control "
                  onChange={handleChange("search")}
                  placeholder="Enter name"
                  style={{ height: "30px" }}
                />
              </div>
              <div
                className="btn input-group-append"
                style={{ border: "none" }}
              >
                <button className="btn align-items-center">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </span>
          </form>
        </div>

        {searchedProducts(results)}
      </div>
      {searched && results.length !== 0 ? (
        <div className="pagination">
          <Pagination
            className="pagination"
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

export default Search;
