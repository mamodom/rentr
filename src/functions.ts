import * as firebaseFunctions from "firebase-functions";
import IRentalProperty from "./IRentalProperty";
import { IEntity } from "fireorm";
import {
  updateRentalPropertyDetails,
  updateRentalProperties,
  updateRentalPropertiesMarkers
} from ".";

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
    await updateRentalPropertiesMarkers();
  });
