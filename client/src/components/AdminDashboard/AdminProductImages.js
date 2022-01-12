import React from "react";

const AdminProductImages = ({ item }) => {
  return (
    <img
      src={`/api/product/photo/${item._id}`}
      alt={item.name}
      className="img-thumbnail thumbnail mr-10"
      width="20%"
    />
  );
};

export default AdminProductImages;
