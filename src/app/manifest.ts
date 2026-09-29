import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Odoratus — Independent Olfactory House",
    short_name: "Odoratus",
    description:
      "Slow-luxury fragrances hand-poured in small batches from sustainably sourced botanicals.",
    start_url: "/",
    display: "standalone",
    background_color: "#141312",
    theme_color: "#c5a880",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
