import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSingleProduct } from "../../helpers/userFetch";
import Card from "./Product_ViewCard";

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const { setError } = useState(false);

  useEffect(() => {
    const productId = match.params.productId;

    getSingleProduct(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  }, []);

  return (
    <>
      <div className="m-2 d-flex justify-content-center">
        <div className="col-md-12">
          {product && product.description && (
            <Card product={product} showViewButton={false} />
          )}
          <Link to="/" className="btn btn-outline-warning float-left">
            Back
          </Link>
        </div>
      </div>
    </>
  );
};

export default Product;
