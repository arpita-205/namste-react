import React, { useState } from "react";

const RestaurantCategory = ({ resCategoryData, showDetails, setShowIndex }) => {
  return (
    <div
      className="w-1/2 text-center border border-gray-400 p-3 rounded-lg cursor-pointer m-3"
      onClick={setShowIndex}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg">{resCategoryData?.title}</span>
        <span>⬇</span>
      </div>

      {showDetails && (
        <div className="flex flex-col gap-4 items-start py-4">
          {resCategoryData?.itemCards?.map((card) => (
            <div className=" w-full border p-2 items-start rounded-md border-gray-300 flex flex-col gap-3">
              <span className="text-xl font-medium">
                {card?.card?.info?.name}
              </span>
              <span className="text-lg text-left">
                {card?.card?.info?.description}
              </span>
              <span>
                {card?.card?.info?.price / 100 ||
                  card?.card?.info?.defaultPrice / 100}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantCategory;
