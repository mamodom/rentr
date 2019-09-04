import fetchListings from "../src/fetchListings";

describe("fetchListings", () => {
  it("returns listings", async () => {
    const listings = await fetchListings();

    expect(listings).toBeTruthy();
  });
});
