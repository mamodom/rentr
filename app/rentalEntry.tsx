import React from "react";
import RentalProperty from "../src/RentalProperty";

const RentalEntry = (props: RentalProperty) => {
  return (
    <div>
      <img src={props.ImageUrl}></img>
      <a href={props.Url}> link</a>
      <p>
        {props.County} / {props.Municipality} / {props.District}
      </p>
    </div>
  );
};

export default RentalEntry;
