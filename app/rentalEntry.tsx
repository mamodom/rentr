import React from "react";
import RentalProperty from "../src/RentalProperty";
import ComuteSummary from "./comuteSummary";

const RentalEntry = (props: RentalProperty) => {
  if (!props.directions) return;
  const coordSegment = ["start_location", "end_location"]
    .map(key =>
      ["lat", "lng"].map(coord => props.directions.legs[0][key][coord]).join()
    )
    .join("/");
  const googlemapsUrl = `//www.google.com/maps/dir/${coordSegment}/data=`;
  const foo =
    `//www.google.com/maps/dir/?api=1&origin=${props.directions.legs[0].start_location.lat},${props.directions.legs[0].start_location.lng}` +
    `&destination=${props.directions.legs[0].end_location.lat},${props.directions.legs[0].end_location.lng}` +
    "&travelmode=transit";

  return (
    <div style={{ paddingTop: "15", display: "flex", margin: "15px" }}>
      <a href={props.Url}>
        <img style={{ height: 150 }} src={props.ImageUrl}></img>
      </a>
      <div>
        <div>{props.MonthlyFee}</div>
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

          <a href={foo}>google maps</a>

          {props.specifikation && (
            <>
              <div>
                <div>Number of bedrooms: </div>
                <div> {props.specifikation.numberOfBedrooms}</div>
              </div>
              <div>
                <div>Number of bathrooms: </div>
                <div> {props.specifikation.numberOfBathrooms}</div>
              </div>
              <div>
                <div>Number of toilets: </div>
                <div> {props.specifikation.numberOfToilets}</div>
              </div>
            </>
          )}
        </div>
        <div>
          {props.directionsSummary && (
            <ComuteSummary directions={props.directionsSummary} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalEntry;
