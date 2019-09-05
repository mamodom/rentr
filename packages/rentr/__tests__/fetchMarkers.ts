import fetchMarkers from "../src/fetchMarkers";

describe("fetchMarkers", () => {
  it("returns markers", async () => {
    const markers = await fetchMarkers();

    expect(markers).toBeTruthy();
  });
});
