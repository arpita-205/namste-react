import React from "react";

const withBestRatedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-5 text-white bg-black rounded-md p-1">
          Best Rated
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default withBestRatedLabel;
