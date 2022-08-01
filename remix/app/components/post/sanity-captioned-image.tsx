/** @jsxImportSource @emotion/react */
import { Block, Image } from "@sanity/types";
import { useMemo } from "react";
import { sanityImageUrlFor } from "~/utils";
import { css } from "@emotion/react";
import { PortableText, toPlainText } from "@portabletext/react";
import { caption as captionTypography } from "~/styles/text";

type Props = {
  src: string;
  alt: string;
  caption: Block;
  imageWidth: number;
  className?: string;
};

function SanityCaptionedImage({
  src,
  alt,
  caption,
  imageWidth,
  ...otherProps
}: Props) {
  /* const imageUrl = useMemo(
    () =>
      sanityImageUrlFor(asset)
        .width(imageWidth)
        .auto("format")
        .quality(50)
        .url(),
    [asset, imageWidth]
  ); */

  const captionComponents = useMemo(
    () => ({
      block: {
        normal: ({ children }: any) => (
          <span css={captionTypography} children={children} />
        ),
      },
      marks: {
        link: ({ value, children }: any) => (
          <a
            css={css`
              text-decoration: underline;
            `}
            href={value?.href}
          >
            {children}
          </a>
        ),
      },
    }),
    []
  );

  return (
    <figure className="m-0" {...otherProps}>
      <img className="w-full" src={src} alt={alt} />
      <figcaption>
        <PortableText value={caption} components={captionComponents} />
      </figcaption>
    </figure>
  );
}

export default SanityCaptionedImage;
