import React from "react";
import RentalProperty from "../src/RentalProperty";

const RentalEntry = (props: RentalProperty) => {
  console.log(JSON.stringify(props));
  return (
    <div style={{ paddingTop: "15", display: "flex" }}>
      <a href={props.Url}>
        <img style={{ height: 150 }} src={props.ImageUrl}></img>
      </a>
      <div>
        <div>{props.District}</div>
        <div>{props.StreetName}</div>
        <div>{props.DescriptionTruncated}</div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>
            <div>Available from: </div>
            <div> {props.AvailableFromFormated}</div>
          </div>
          <div>
            <div>Area: </div>
            <div> {props.Area}</div>
          </div>
          {/* <div>
            <div>Number of bedrooms: </div>
            <div> {props.numberOfBedrooms}</div>
          </div>
          <div>
            <div>Number of bathrooms: </div>
            <div> {props.numberOfBathrooms}</div>
          </div>
          <div>
            <div>Number of toilets: </div>
            <div> {props.numberOfToilets}</div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RentalEntry;
