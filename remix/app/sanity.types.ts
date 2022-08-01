import { Image, Block } from "@sanity/types";

export interface CaptionedImage extends Image {
  _type: "captionedImage";
  alt: string;
  caption: Block[];
}