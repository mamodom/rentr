import { DirectionsRoute, DirectionsStep } from "@google/maps";
import { DirectionsSummary } from "./DirectionsSummary";
import { StepSummary } from "./StepSummary";

const createStepSummary = (step: DirectionsStep): StepSummary => {
  let transitDetails = {};

  if (step.transit_details) {
    const td = step.transit_details;

    transitDetails = {
      vehicle: td.line.vehicle.name,
      icon: td.line.vehicle.icon,
      localIcon: td.line.vehicle.local_icon,
      color: td.line.color,
      name: td.line.short_name,
      to: td.arrival_stop.name,
      from: td.departure_stop.name,
      numberOfStops: td.num_stops
    };
  }

  return {
    travelMode: ((step as unknown) as { travel_mode: string }).travel_mode,
    duration: step.duration,
    distance: step.distance,
    description: step.html_instructions,
    ...Object.entries(transitDetails).reduce(
      (acc, [k, v]) => (v === undefined ? acc : { ...acc, [k]: v }),
      {}
    )
  };
};

const createDirectionsSummary = (
  directions: DirectionsRoute
): DirectionsSummary | undefined => {
  if (directions.legs.length > 1)
    console.warn(`DirectionsRoute contains more than one leg`);

  // since we're not using waypoints there will only be one leg
  // see: https://developers.google.com/maps/documentation/directions/intro#Legs
  const leg = directions.legs[0];

  const steps = leg.steps.map(createStepSummary);

  const modes = steps
    .map(a => a.vehicle || a.travelMode)
    .reduce((acc, cur) => ({ ...acc, [cur]: true }), {});

  const response = {
    distance: leg.distance,
    duration: leg.duration,
    steps,
    modes
  };
  return response;
};

export default createDirectionsSummary;
