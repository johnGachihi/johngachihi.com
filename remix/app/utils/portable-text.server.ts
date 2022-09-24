import {toHTML} from "@portabletext/to-html";
import type {Block} from "@sanity/types";
import type {CaptionedImage, CodeBlock} from "~/sanity.types";
import DOMPurify from "dompurify";
import {JSDOM} from "jsdom";
import {sanityImageUrlFor} from ".";
import hljs from "highlight.js";

// @ts-ignore
const purify = DOMPurify(new JSDOM("").window);

export function captionedImageToHtml(
    // TODO: Why is this not a scalar value
    portableText: (Block | CaptionedImage | CodeBlock)[],
    { withYMargin = true }: { withYMargin?: boolean } = {}
): string {
    const unsanitizedHTML = toHTML(portableText, {
        components: {
            block: {
                normal: ({children}) =>
                    `<span class="caption">${children}</span>`,
            },
            types: {
                captionedImage: ({value}: { value: CaptionedImage }) => {
                    const imgBuilder = sanityImageUrlFor(value.asset)
                        .auto("format")
                        .quality(50);
                    const imgUrl_600 = imgBuilder.width(600).url();
                    const imgUrl_800 = imgBuilder.width(800).url();

                    /* TODO: Check whether appropriate image is picked */
                    return `
            <figure class="${withYMargin ? 'my-10' : ''}">
              <img
                class="w-full"
                srcset="${imgUrl_600} 600w,
                        ${imgUrl_800} 800w"
                sizes="(max-width: 600px) 600px,
                        800px"
                alt="${value.alt ?? ""}"
              />
              <figcaption>
                ${captionedImageToHtml(value.caption)}
              </figcaption>
            </figure>
          `;
                },
            },
        },
    });

    return purify.sanitize(unsanitizedHTML);
}

export function postPortableTextToHtml(
    portableText: (Block | CaptionedImage | CodeBlock)[]
): string {
  const unsanitizedHTML = toHTML(portableText, {
    components: {
      types: {
        captionedImage: ({ value }) => captionedImageToHtml(value),
        codeBlock: ({ value }) =>
          `<div class="code-block-container">
            <pre><code>${
              hljs.highlight(value.code, { language: value.language }).value
            }</code></pre>
          </div>`,
      },
    },
});

    return purify.sanitize(unsanitizedHTML);
}
