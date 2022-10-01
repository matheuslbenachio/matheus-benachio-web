import { API_ENDPOINT } from "../App/App";
import { Pages } from "../Components/Pagination/Pagination";

/**
 * According to github (https://docs.github.com/en/rest/guides/traversing-with-pagination#basics-of-pagination)
 * We should "Always rely on these link relations provided to you. Don't try to guess or construct your own URL"
 * so we need to parse and extract the LINK header of github to figure out the first/prev/next/last page.
 */
async function parseLinkHeader(link: string): Promise<Pages> {
  const data: Pages = {
    last: 0,
    prev: 0,
    next: 0,
    first: 0,
  };

  if (link) {
    const items = String(link).split(",");
    for (const x of items) {
      const split = x.split(";");
      const rest = split[0].replace(/<|>/g, "").replace(API_ENDPOINT, "");
      const page = Number(new URLSearchParams(rest).get("page"));

      if (split[1].includes("last")) {
        data.last = page;
      } else if (split[1].includes("next")) {
        data.next = page;
      } else if (split[1].includes("prev")) {
        data.prev = page;
      } else if (split[1].includes("first")) {
        data.first = page;
      }
    };
  }

  return data;
}

export { parseLinkHeader };
