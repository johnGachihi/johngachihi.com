import { Image } from "@sanity/types";
import { useMemo } from "react";
import imageUrlFor from "../../util/sanity-image";

function useSanityImageUrl(
  asset: Image & { _type: "image" },
  options: { width?: number } = {}
) {
  const { width = 600 } = options

  return useMemo(() =>
      imageUrlFor(asset)
        .width(width)
        .auto("format")
        .quality(50)
        .url(),
    [asset, width])
}

export default useSanityImageUrl