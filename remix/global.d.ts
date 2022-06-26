interface CaptionedImage extends Image {
  _type: "captionedImage";
  alt: string;
  caption: Block[];
}