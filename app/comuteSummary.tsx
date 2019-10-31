import React from "react";
import { DirectionsRoute } from "@google/maps";
import { DirectionsSummary } from "../src/DirectionsSummary";
import { StepSummary } from "../src/StepSummary";

const SubLeg = ({
  travelMode,
  vehicle,
  color,
  name,
  from,
  to,
  icon,
  localIcon,
  duration,
}) => (
  <div>
    <div style={{ display: "flex", alignItems: "baseline" }}>
      <img
        src={
          travelMode === "WALKING"
            ? "https://maps.gstatic.com/mapfiles/transit/iw2/7/walk.png"
            : localIcon || icon
        }
        alt=""
      />
      <span
        style={{
          backgroundColor: color,
          border: "1px solid black",
          margin: "4px",
          paddingLeft: "3px",
          paddingRight: "3px",
        }}
      >
        {name}
      </span>
      <span>{duration}</span>
    </div>
    <div>{from && `${from} => ${to}`}</div>
  </div>
);

const Step: React.FunctionComponent<StepSummary> = ({
  icon,
  localIcon,
  travelMode,
  name,
  color,
  description,
  distance,
  duration,
  vehicle,
  from,
  numberOfStops,
  to,
}) => (
  <div style={{ display: "flex" }}>
    <img
      style={{ width: 15, height: 15, padding: 3 }}
      src={
        travelMode === "WALKING"
          ? "https://maps.gstatic.com/mapfiles/transit/iw2/7/walk.png"
          : localIcon || icon
      }
    />
    {name && (
      <div
        style={{
          backgroundColor: color,
          width: 16,
          height: 16,
          paddingRight: 3,
          color: color ? "white" : "black",
          border: "1px solid black",
        }}
      >
        {name}
      </div>
    )}
  </div>
);

const ComuteSummary: React.FunctionComponent<{
  directions: DirectionsSummary;
}> = ({ directions }) => {
  const walkingTime = directions.steps
    .filter(step => step.travelMode === "WALKING")
    .reduce((walkingTime, { duration }) => walkingTime + duration.value, 0);

  const walkingText = `${Math.trunc(walkingTime / 60)} min walk`;

  return (
    <div>
      <div>{directions.distance.text}</div>
      <div>{directions.duration.text}</div>
      <div style={{ display: "flex" }}>
        {directions.steps
          .map(step => <Step key={step.description} {...step} />)
          .reduce((acc, cur, i) => (i ? [...acc, " > ", cur] : [cur]), [])}
      </div>
      <div>{walkingText}</div>
    </div>
  );
};

export default ComuteSummary;
