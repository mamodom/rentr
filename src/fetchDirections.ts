import { createClient } from "@google/maps";
import IMarker from "./IMarker";
import nextMondayAt9AM from "./nextMondayAt9AM";

const fetchDirections = async (marker: IMarker) => {
  if (!marker.Latitude || !marker.Longitude)
    throw new Error(`marker is not valid\n${JSON.stringify(marker, null, 4)}`);
  if (!process.env.TARGET_DESTINATION_LAT)
    throw new Error("Missing TARGET_DESTINATION_LAT");
  if (!process.env.TARGET_DESTINATION_LON)
    throw new Error("Missing TARGET_DESTINATION_LON");

  if (!process.env.DIRECTIONS_API_KEY)
    throw new Error("DIRECTIONS_API_KEY missing");
  const client = createClient({
    key: process.env.DIRECTIONS_API_KEY,
    Promise: Promise
  });

  const nextMonday9AM = nextMondayAt9AM();

  const response = await client
    .directions({
      mode: "transit",
      destination: [
        +process.env.TARGET_DESTINATION_LAT,
        +process.env.TARGET_DESTINATION_LON
      ],
      origin: [marker.Latitude, marker.Longitude],
      // eslint-disable-next-line
      arrival_time: nextMonday9AM
    })
    .asPromise();

  if (response.status !== 200)
    throw new Error(
      `Got a non 200 response ${JSON.stringify(response, null, 4)}`
    );

  if (response.json.status !== "OK")
    throw new Error(
      `Got a non 'Ok' status ${JSON.stringify(response, null, 4)} `
    );

  return response.json;
};

export default fetchDirections;
