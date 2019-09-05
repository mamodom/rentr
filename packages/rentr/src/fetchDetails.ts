import axios from "axios";
import { load } from "cheerio";
import { camelCase } from "lodash";
import { IPropertyDetails } from "models";

function* values(node: CheerioElement): IterableIterator<string> {
  for (const t of node.children) {
    if (t.nodeValue) yield t.nodeValue.trim();

    if (t.children && t.children.length > 0) yield* values(t);
  }
}

export const fetchDetails = async (url: string): Promise<IPropertyDetails> => {
  const response = await axios.get<string>(url);

  const $ = load(response.data);

  const elements = $(".item-details-list-item");

  const entries = Array.from(elements, node =>
    Array.from(values(node)).filter(Boolean)
  ).map(([k, v = true]) => ({ [camelCase(k)]: v }));

  const {
    propertyType = "",
    numberOfBedrooms = "",
    numberOfBathrooms = "",
    deposit = "",
    rentalPeriod = "",
    floor = "",
    numberOfToilets = "",
    ...additional
  } = Object.assign({}, ...entries);
  return {
    propertyType,
    numberOfBedrooms,
    numberOfBathrooms,
    deposit,
    rentalPeriod,
    floor,
    numberOfToilets,
    additional
  };
};
