import fireorm from "./storage";

import RentalProperty from "./RentalProperty";
import fetchListings from "./fetchListings";

const updateRentalProperties = async () => {
  const rentalRepository = fireorm.GetRepository(RentalProperty);
  const listings = await fetchListings();

  const existing = await rentalRepository.find();

  const existingIds = new Set(existing.map(r => r.Id));

  for (const listing of listings) {
    if (existingIds.has(listing.Id)) {
      continue;
    }

    await rentalRepository.create(listing);
  }

  console.log("done");
};

export { updateRentalProperties };
