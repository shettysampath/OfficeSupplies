import React from "react";
import { Link } from "react-router-dom";
import Images from "./Images";

const Card = ({ category }) => {
  return (
    <Link
      to={`/searchCategory/${category._id}`}
      className="card text-decoration-none"
    >
      <div className="card h-100 text-center">
        <div className="card-header">{category.name}</div>
        <div className="card-img-fluid ">
          <Images item={category} />
        </div>
      </div>
    </Link>
  );
};

export default Card;
