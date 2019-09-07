import * as firebaseFunctions from "firebase-functions";
import { PubSub } from "@google-cloud/pubsub";
import IRentalProperty from "./IRentalProperty";
import { IEntity } from "fireorm";
import {
  updateRentalPropertyDetails,
  updateRentalProperties,
  updateRentalPropertiesMarkers,
  updateRentalDirections
} from ".";
import IMarker from "./IMarker";

const DIRECTIONS_TOPIC = "DIRECTIONS_TOPIC";

export const fetchRentalDetails = firebaseFunctions.firestore
  .document("/RentalProperties/{propertyId}")
  .onCreate(async snapshot => {
    const { Url, id } = snapshot.data() as IRentalProperty & IEntity;

    return updateRentalPropertyDetails(id, Url);
  });

export const fetchRentalProperties = firebaseFunctions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    await updateRentalProperties();

    const pubsub = new PubSub();

    for await (const message of updateRentalPropertiesMarkers())
      await pubsub
        .topic(DIRECTIONS_TOPIC)
        .publish(Buffer.from(JSON.stringify(message)));
  });

export const fetchRentalDirections = firebaseFunctions.pubsub
  .topic(DIRECTIONS_TOPIC)
  .onPublish(async message => {
    const { id, marker }: { id: string; marker: IMarker } = message.json;

    await updateRentalDirections(id, marker);
  });
