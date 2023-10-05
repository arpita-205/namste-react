const RestaurantCard = (props) => {
  const {
    name,
    cuisines,
    avgRatingString,
    sla,
    cloudinaryImageId,
    costForTwo,
  } = props?.resData?.info;
  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossn x.x.xy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt="res-log"
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRatingString}</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime} min</h4>
    </div>
  );
};
export default RestaurantCard;
