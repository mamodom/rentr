import axios, { AxiosResponse } from "axios";
import IMarker from "./IMarker";

const fetchMarkers = async () => {
  const filter = {
    SearchTags: [
      {
        Name: "Stockholm Södermalm (område)",
        Url: "stockholm-sodermalm",
        Identifier: null,
        Type: 0
      },
      {
        Name: "Stockholm City (område)",
        Url: "stockholm-city",
        Identifier: null,
        Type: 0
      },
      {
        Name: "Stockholm (län)",
        Url: "stockholm",
        Identifier: null,
        Type: 0
      },
      {
        Name: "Stockholm (kommun)",
        Url: "stockholm/stockholm",
        Identifier: null,
        Type: 0
      }
    ],
    Culture: "en-US",
    ObjectsPerPage: 10,
    Page: 1,
    AllObjects: true
  };

  const apiResponse: AxiosResponse<IMarker[]> = await axios.post(
    "https://www.residensportalen.com/umbraco/api/objectsapi/markers",
    filter
  );
  return apiResponse.data;
};

export default fetchMarkers;
