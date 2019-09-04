import fireorm from "./storage";
import fetchListings from "./fetchListings";
import RentalProperty from "./RentalProperty";
import fetchMarkers from "./fetchMarkers";

const updateRentalProperties = async () => {
  const rentalRepository = fireorm.GetRepository(RentalProperty);
  const listings = await fetchListings();

  const existing = await rentalRepository.find();

  const existingIds = new Set(existing.map(r => r.Id));

  for (const listing of listings) {
    if (existingIds.has(listing.Id)) {
      continue;
    }

    await rentalRepository.create({ id: "", ...listing });
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

export { updateRentalProperties, updateRentalPropertiesMarkers };
