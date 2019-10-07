import fireorm from "./storage";
import fetchListings from "./fetchListings";
import RentalProperty from "./RentalProperty";
import fetchMarkers from "./fetchMarkers";
import { fetchDetails } from "./fetchDetails";
import IMarker from "./IMarker";
import fetchDirections from "./fetchDirections";
import { DirectionsResponse } from "@google/maps";
import createDirectionsSummary from "./createDirectionsSummary";
import { IEntity } from "fireorm";

const updateRentalProperties = async () => {
  const rentalRepository = fireorm.GetRepository(RentalProperty);
  const listings = await fetchListings();

  const existing = await rentalRepository.find();

  const existingIds = new Set(existing.map(r => r.Id));

  const batch = rentalRepository.createBatch();

  for (const listing of listings) {
    if (existingIds.delete(listing.Id)) {
      continue;
    }

    batch.create({
      id: "",
      ...listing,
      importedAt: new Date(),
      available: true,
    } as IEntity);
  }

  existing
    .filter(entry => existingIds.has(entry.Id))
    .forEach(entry => {
      batch.update({ ...entry, available: false } as IEntity);
    });

  const result = await batch.commit();

  console.log(result);

  return "done";
};

async function* updateRentalPropertiesMarkers() {
  const rentalRepository = fireorm.GetRepository(RentalProperty);
  const markers = await fetchMarkers();

  const existing = await rentalRepository.find();

  const existingIds = existing.reduce(
    (acc, cur) => Object.assign({}, acc, { [cur.Id || ""]: cur }),
    {} as { [k: number]: RentalProperty }
  );

  for (const marker of markers) {
    if (!marker.RentalObjectId) continue;

    const document = existingIds[marker.RentalObjectId];
    if (!document || document.RentalObjectId) continue;

    await rentalRepository.update({
      id: document.id,
      ...marker,
    });
    yield { id: document.id, marker };
  }
}

const updateRentalPropertyDetails = async (
  firestoreId: string,
  url?: string
) => {
  if (!url) {
    console.error(`Document ${firestoreId} has no Url`);
    return;
  }
  const rentalRepository = fireorm.GetRepository(RentalProperty);
  const details = await fetchDetails(url);

  await rentalRepository.update({ id: firestoreId, ...details });
  return JSON.stringify(details, null, 4);
};

const updateAllRentalPropertyDetails = async () => {
  const rentalRepository = fireorm.GetRepository(RentalProperty);

  const existing = await rentalRepository.find();

  existing
    .filter(p => !p.propertyInformation)
    .forEach(async ({ id, Url }) => await updateRentalPropertyDetails(id, Url));
};

const updateRentalDirections = async (firestoreId: string, marker: IMarker) => {
  const rentalRepository = fireorm.GetRepository(RentalProperty);

  const result: {
    response?: DirectionsResponse;
    error?: Error;
  } = await fetchDirections(marker)
    .then(response => ({ response }))
    .catch(error => ({ error }));

  if (result.error) {
    console.error(result.error);
    return;
  }

  if (!result.response) {
    console.error("result.response is no defined");
    return;
  }

  const directionsSummary = createDirectionsSummary(result.response.routes[0]);

  await rentalRepository.update({
    id: firestoreId,
    directions: result.response.routes[0],
    directionsSummary,
  });
};

export {
  updateRentalProperties,
  updateRentalPropertiesMarkers,
  updateRentalPropertyDetails,
  updateAllRentalPropertyDetails,
  updateRentalDirections,
};
