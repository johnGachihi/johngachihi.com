import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import imageUrlFor from "../../util/sanity-image";
import styled from "@emotion/styled";
import { Image } from "@sanity/types";

type Props = {
  sanityImage: Image | { _type: "image" }
}

function ShowcaseImage({ sanityImage }: Props) {
  const isXs = useMediaQuery("(max-width: 600px)")

  const imageUrl = useMemo(() => {
    return  imageUrlFor(sanityImage)
      .width(isXs ? 600 : 800)
      .auto("format")
      .quality(50)
      .url()
  }, [isXs, sanityImage])

  return <Img src={imageUrl} alt="Project showcase"/>
}

const Img = styled.img`
  width: 100%;
`

export default ShowcaseImage