import { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { DATA_URL } from "../utils/constants";
import withBestRatedLabel from "./withBestRatedLabel";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const RestaurantCardBestRated = withBestRatedLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(DATA_URL);

    const json = await data.json();
    console.log(json, "json");
    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRes(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="px-20 py-4">
      <div className="flex items-center gap-4 py-10">
        <div className="search">
          <input
            type="text"
            className="search-box  border border-black rounded p-2 m-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="search-button"
            onClick={() => {
              const filteredList = listOfRestaurants?.filter((res) =>
                res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRes(filteredList);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            setListOfRestaurants(
              listOfRestaurants?.filter((arr) => arr.info.avgRating > 4)
            );
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="flex flex-wrap gap-8">
        {filteredRes?.map((resObj) =>
          resObj?.info?.avgRating > 4.3 ? (
            <RestaurantCardBestRated resData={resObj} key={resObj.info.id} />
          ) : (
            <RestaurantCard resData={resObj} key={resObj.info.id} />
          )
        )}
      </div>
    </div>
  );
};
export default Body;
