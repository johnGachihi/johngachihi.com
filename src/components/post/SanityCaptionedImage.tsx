/** @jsxImportSource @emotion/react */
import { Image } from "@sanity/types";
import { useMemo } from "react";
import imageUrlFor from "../../util/sanity-image";
import { css } from "@emotion/react";
import { PortableText } from "@portabletext/react";
import { caption as captionTypography } from "../../style/text";

type Props = {
  asset: Image & { _type: "captionedImage", caption: any, alt: any }
  imageWidth: number
  className?: string
}

function SanityCaptionedImage({ asset, imageWidth, ...otherProps }: Props) {
  const imageUrl = useMemo(
    () => imageUrlFor(asset)
      .width(imageWidth)
      .auto("format")
      .quality(50)
      .url(),
    [asset, imageWidth]
  )

  const captionComponents = useMemo(() => ({
    block: {
      normal: ({ children }: any) =>
        <span css={captionTypography} children={children}/>
    },
    marks: {
      link: ({ value, children }: any) =>
        <a css={css`text-decoration: underline`} href={value?.href}>{children}</a>,
    }
  }), [])

  return (
    <figure css={css`margin: 0`} {...otherProps}>
      <img css={css`width: 100%`} src={imageUrl} alt={asset.alt} />
      <figcaption>
        <PortableText value={asset.caption} components={captionComponents}/>
      </figcaption>
    </figure>
  )
}

export default SanityCaptionedImage