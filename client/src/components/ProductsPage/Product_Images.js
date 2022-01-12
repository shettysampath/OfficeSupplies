import React from "react";

const Images = ({ item }) => {
  return (
    <div className="product-img">
      <img
        src={`/api/product/photo/${item._id}`}
        alt={item.name}
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Images;
