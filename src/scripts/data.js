import dotenv from "dotenv";
import { join } from "node:path";
import { writeFile } from "node:fs";

dotenv.config({ path: [".env.local", ".env"] });

const TRANSISTOR_API_KEY = process.env.TRANSISTOR_API_KEY;
const TRANSISTOR_SHOW_ID = process.env.TRANSISTOR_SHOW_ID;
const TRANSISTOR_STATUS = process.env.TRANSISTOR_STATUS;

export async function fetchEpisodes(
  apiKey = TRANSISTOR_API_KEY,
  showId = TRANSISTOR_SHOW_ID,
  status = TRANSISTOR_STATUS,
  pageSize = 50
) {
  let meta = {
    currentPage: 1,
    totalPages: -1,
  };

  const episodeData = [];

  do {
    const response = await fetch(
      `https://api.transistor.fm/v1/episodes?show_id=${showId}&status=${status}&pagination[per]=${pageSize}&pagination[page]=${meta.currentPage}`,
      {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
        },
      }
    ).then((response) => response.json());

    episodeData.push(...response.data);

    meta = {
      currentPage: response.meta.currentPage + 1,
      totalPages: response.meta.totalPages,
    };
  } while (meta.currentPage <= meta.totalPages);

  return episodeData;
}

export async function fetchShow(
  apiKey = TRANSISTOR_API_KEY,
  showId = TRANSISTOR_SHOW_ID
) {
  const response = await fetch(`https://api.transistor.fm/v1/shows/${showId}`, {
    method: "GET",
    headers: {
      "x-api-key": apiKey,
    },
  }).then((response) => response.json());

  return response.data;
}

const episodeData = await fetchEpisodes();
const showData = await fetchShow();

const episodeFilePromises = episodeData.map((episode) => {
  return writeFile(
    join(
      process.cwd() + `/src/content/episodes/${episode.attributes.slug}.json`
    ),
    JSON.stringify(episode.attributes, null, 2),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
});

await writeFile(
  join(process.cwd() + `/src/content/show/details.json`),
  JSON.stringify(showData.attributes, null, 2),
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);

await Promise.all(episodeFilePromises);
