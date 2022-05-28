import { Block, Image } from "@sanity/types";

export interface ArticleSummary {
  id: string
  title: string
  slug: string
  publishedOn: string
  tags: string[]
}

export interface Article extends ArticleSummary{
  mainImage: Image;
  content: (Block | CaptionedImage)[]
}

export type CaptionedImage = Image & {
  _type: "captionedImage",
  caption: Block[],
  alt: string
}