import { useState } from "react";
import { resList } from "../utils/mockData";
import RestaurantCard from "./RestaurantCard";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState(resList);
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            setListOfRestaurants(
              listOfRestaurants.filter((arr) => arr.info.avgRating > 4)
            );
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((resObj) => (
          <RestaurantCard resData={resObj} key={resObj.info.id} />
        ))}
        {/* <RestaurantCard
            resName="KFC"
            cuisine="Burger, Fast Food"
            rating="4.0 stars"
            delTime="20 min"
          /> */}
      </div>
    </div>
  );
};
export default Body;
