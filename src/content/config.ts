import { defineCollection, z } from "astro:content";

const episodeCollection = defineCollection({
  type: "data",
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    media_url: z.string(),
    number: z.number(),
    duration: z.number().nullable(),
    formatted_summary: z.string().nullable(),
    formatted_description: z.string(),
  }),
});

export const collections = {
  episodes: episodeCollection,
};
