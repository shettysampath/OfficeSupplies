import React from "react";

const Images = ({ item }) => {
  return (
    <div className="category-img">
      <img
        src={`/api/category/photo/${item._id}`}
        alt={item.name}
        className=" "
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default Images;
