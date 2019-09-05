import * as firebaseFunctions from "firebase-functions";
import { IRentalProperty } from "models";
import { IEntity } from "fireorm";
import { updateRentalPropertyDetails } from ".";

export const fetchRentalDetails = firebaseFunctions.firestore
  .document("/RentalProperties/{propertyId}")
  .onCreate(async snapshot => {
    const { Url, id } = snapshot.data() as IRentalProperty & IEntity;

    return updateRentalPropertyDetails(id, Url);
  });
