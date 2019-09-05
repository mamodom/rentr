import axios from "axios";
import { IPaginatedResponse } from "./IPaginatedResponse";
import IRentalProperty from "./IRentalProperty";

export default async () => {
  const filter = {
    Culture: "en-US",
    ObjectsPerPage: 10,
    Page: 1,
    AllObjects: true
  };
  const apiReponse = await axios.post<IPaginatedResponse<IRentalProperty>>(
    "https://www.residensportalen.com/umbraco/api/objectsapi/objects",
    filter
  );

  if (apiReponse.data.Items) return apiReponse.data.Items;

  throw new Error(
    `data.Items is falsy\n${JSON.stringify(apiReponse.data, null, 4)}`
  );
};
