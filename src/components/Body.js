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
  const [isClearFilter, setIsClearFilter] = useState({
    search: false,
    topRatedRes: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(DATA_URL);

    const json = await data.json();

    setListOfRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRes(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };
  useEffect(() => {
    if (!searchText) {
      setFilteredRes(listOfRestaurants);
    } else {
      const filteredList = filteredRes?.filter((res) =>
        res?.info?.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredRes(filteredList);
    }
  }, [searchText]);

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="px-20 py-4">
      <div className="flex items-center gap-4 py-10">
        <div className="search">
          <input
            type="text"
            className="search-box  border border-black rounded p-2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setIsClearFilter({
                ...isClearFilter,
                search: true,
              });
            }}
          />
          {/* <button
            className="search-button p-2 m-2"
            
            Search
          </button> */}
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            setIsClearFilter({
              ...isClearFilter,
              topRatedRes: true,
            });
            setFilteredRes(
              filteredRes?.filter((arr) => arr.info.avgRating > 4.3)
            );
          }}
        >
          Top Rated Restaurants
        </button>
        {(isClearFilter.search || isClearFilter.topRatedRes) && (
          <span
            aria-describedby="Clear Filter"
            className="cursor-pointer"
            onClick={() => {
              setIsClearFilter({
                search: false,
                topRatedRes: false,
              });
              setFilteredRes(listOfRestaurants);
              setSearchText("");
            }}
          >
            ❌
          </span>
        )}
      </div>
      <div className="grid grid-cols-5  gap-8">
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
