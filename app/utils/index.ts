import invariant from "tiny-invariant";
import PicoSanity from "picosanity";
import imageUrlBuilder from "@sanity/image-url";
import dayjs from "dayjs";


export function createSanityClient() {
  invariant(process.env.SANITY_PROJECT_ID, "SANITY_PROJECT_ID not provided");
  invariant(process.env.SANITY_DATASET, "SANITY_DATASET not provided");

  return new PicoSanity({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2022-03-17",
    useCdn: false,
    token: process.env.SANITY_TOKEN
  });
}

export function formatDate(dateString: string, format: string): string {
  return dayjs(dateString).format(format);
}

export function sanityImageUrlFor(image: any) {
  const builder = imageUrlBuilder(createSanityClient());
  return builder.image(image);
}
