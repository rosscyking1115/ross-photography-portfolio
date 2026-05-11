import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const galleries = defineCollection({
  loader: glob({ pattern: "**/index.md", base: "./src/content/galleries" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      cover: image(),
      date: z.coerce.date(),
      location: z.string().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(1, "alt text is required"),
            caption: z.string().optional(),
          }),
        )
        .min(1),
    }),
});

export const collections = { galleries };
