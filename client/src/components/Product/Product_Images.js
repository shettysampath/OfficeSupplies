import React from "react";

const Product_Images = ({ item }) => {
  return (
    <div className="product_view-img ">
      <img src={`/api/product/photo/${item._id}`} alt={item.name} />
    </div>
  );
};

export default Product_Images;
