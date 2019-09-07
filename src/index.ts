import fireorm from "./storage";
import fetchListings from "./fetchListings";
import RentalProperty from "./RentalProperty";
import fetchMarkers from "./fetchMarkers";
import { fetchDetails } from "./fetchDetails";

const updateRentalProperties = async () => {
  const rentalRepository = fireorm.GetRepository(RentalProperty);
  const listings = await fetchListings();

  const existing = await rentalRepository.find();

  const existingIds = new Set(existing.map(r => r.Id));

  for (const listing of listings) {
    if (existingIds.has(listing.Id)) {
      continue;
    }

    const created = await rentalRepository.create({
      id: "",
      ...listing,
      importedAt: new Date()
    });
    console.info(`created ${created.id}`);
  }
  return "done";
};

const updateRentalPropertiesMarkers = async () => {
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
      ...marker
    });
  }
  return "done";
};

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

export {
  updateRentalProperties,
  updateRentalPropertiesMarkers,
  updateRentalPropertyDetails,
  updateAllRentalPropertyDetails
};
