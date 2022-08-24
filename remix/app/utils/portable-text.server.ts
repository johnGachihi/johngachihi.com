import { toHTML } from "@portabletext/to-html";
import { Block } from "@sanity/types";
import { CaptionedImage, CodeBlock } from "~/sanity.types";
import DOMPurify from "dompurify";
import { JSDOM } from "jsdom";

// @ts-ignore
const purify = DOMPurify(new JSDOM("").window);

export function portableTextToHTML(
  portableText: (Block | CaptionedImage | CodeBlock)[]
): string {
  const unsanitizedHTML = toHTML(portableText, {
    components: {
      types: {
        captionedImage: () => `A la mode`,
      },
    },
  });

  return purify.sanitize(unsanitizedHTML);
}
