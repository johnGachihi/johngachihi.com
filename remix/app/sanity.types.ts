import { Image, Block } from "@sanity/types";

export interface CaptionedImage extends Image {
  _type: "captionedImage";
  alt: string;
  caption: Block[];
}

export interface CodeBlock {
  _type: "codeBlock";
  code: string;
  language: string;
}
