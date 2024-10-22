import { useNavigate, useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { id, name, cuisines, avgRating, sla, cloudinaryImageId, costForTwo } =
    props?.resData?.info;

  const navigate = useNavigate();

  return (
    <div
      className="bg-orange-100 w-72 border-2 border-gray-200 p-3 m-3 rounded-2xl cursor-pointer hover:shadow-2xl"
      onClick={() => navigate(`/restaurant/${id}`)}
    >
      <img
        className="rounded-md border-2 border-black"
        src={CDN_URL + cloudinaryImageId}
        alt="res-log"
      />
      <h3 className="text-2xl font-bold py-2">{name}</h3>
      <h4 className="text-xl font-medium py-2">🍽 {cuisines.join(", ")}</h4>
      <h4 className="text-lg font-medium py-2">⭐️ {avgRating}</h4>
      <h4 className="text-lg font-medium py-2">💸 {costForTwo}</h4>
      <h4 className="text-lg font-medium">🏎 {sla.slaString} </h4>
    </div>
  );
};
export default RestaurantCard;
