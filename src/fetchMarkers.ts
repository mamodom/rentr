import axios, { AxiosResponse } from "axios";
import { Marker } from "./Marker";

const fetchMarkers = async () => {
  const filter = {
    Culture: "en-US",
    ObjectsPerPage: 10,
    Page: 1,
    AllObjects: true
  };

  const apiResponse: AxiosResponse<Marker[]> = await axios.post(
    "https://www.residensportalen.com/umbraco/api/objectsapi/markers",
    filter
  );
  return apiResponse.data;
};

export default fetchMarkers;
