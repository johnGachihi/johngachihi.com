import { sanityClient } from "../api/sanity-client";
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(sanityClient)

function imageUrlFor(image: any) {
  return builder.image(image)
}

export default imageUrlFor