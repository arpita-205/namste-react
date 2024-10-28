import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "./custom hooks/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);
  const { resId } = useParams();
  const resInfo = useRestaurantMenu({ resId });

  if (resInfo === null) {
    return <Shimmer />;
  }
  const data = resInfo?.cards[2]?.card?.card?.info;
  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (card) =>
        card?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="flex flex-col justify-center items-center p-10">
      <div className="py-4">
        <h1 className="text-3xl py-4 font-semibold">{data?.name}</h1>
        <h3 className="text-xl font-medium">
          {data?.cuisines?.join(",")}- {data?.costForTwoMessage}
        </h3>
      </div>

      {categories?.map((data, index) => (
        <>
          <RestaurantCategory
            resCategoryData={data?.card?.card}
            setShowIndex={() =>
              setShowIndex(showIndex === index ? null : index)
            }
            index={index}
            showIndex={showIndex}
            showDetails={index === showIndex ? true : false}
          />
        </>
      ))}
    </div>
  );
};

export default RestaurantMenu;
