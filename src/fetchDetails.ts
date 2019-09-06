import axios from "axios";
import { load } from "cheerio";
import { camelCase } from "lodash";
import IPropertyDetails from "./IPropertyDetails";

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

  const props = new Set([
    "propertyType",
    "numberOfBedrooms",
    "numberOfBathrooms",
    "numberOfToilets",
    "deposit",
    "rentalPeriod",
    "floor",
    "buildingYearOfHouse",
    "furnishing"
  ]);

  const result = Array.from(elements, node =>
    Array.from(values(node)).filter(Boolean)
  ).reduce<IPropertyDetails>((acc, [k, v = "yes"]) => {
    const key = camelCase(k);
    const value = isNaN(+v) ? v : +v;
    if (props.has(key)) return { ...acc, [key]: value };
    return { ...acc, additional: { ...acc.additional, [key]: value } };
  }, {});

  return result;
};
