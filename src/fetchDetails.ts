import axios from "axios";
import { load } from "cheerio";
import { camelCase } from "lodash";
import IPropertyDetails from "./IPropertyDetails";

function flatten<T>(arr: T[]) {
  return ([] as T[]).concat(...arr);
}
export const fetchDetails = async (url: string): Promise<IPropertyDetails> => {
  const response = await axios.get<string>(url);
  const html = response.data;

  const $ = load(html, { normalizeWhitespace: true });

  const lists = $(".item-details-list");

  const sections = Array.from(lists)
    .map(node => {
      const title = $(node)
        .prev()
        .text();
      if (!title.length) return;

      const sectionItems = Array.from($(".item-details-list-item", node), el =>
        el.children
          .map(child =>
            $(child)
              .text()
              .trim()
          )
          .filter(s => s.length)
      );

      if (sectionItems.every(v => v.length === 1)) {
        if (sectionItems.length === 1)
          return { [camelCase(title)]: sectionItems[0][0] };
        return { [camelCase(title)]: flatten(sectionItems) };
      }

      const parsedKeyValues = sectionItems.map(([k, v]) => {
        if (!/[^0-9|,]/.exec(v))
          return { [camelCase(k)]: parseInt(v.replace(/,/, "")) };

        return { [camelCase(k)]: v };
      });

      return {
        [camelCase(title)]: Object.assign({}, ...parsedKeyValues)
      };
    })
    .filter(Boolean);

  return Object.assign({}, ...sections);
};
