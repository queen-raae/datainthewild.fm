import { getCollection } from "astro:content";

export async function getEpisodesDesc() {
  const episodes = await getCollection("episodes");
  const sortedEpisodes = episodes.sort((a, b) => {
    return new Date(b.data.published_at) - new Date(a.data.published_at);
  });
  return sortedEpisodes;
}
