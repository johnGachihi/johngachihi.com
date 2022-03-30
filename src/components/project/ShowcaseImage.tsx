import { useMediaQuery } from "@mui/material";
import styled from "@emotion/styled";
import { Image } from "@sanity/types";
import useSanityImageUrl from "./useSanityImageUrl";

type Props = {
  sanityImage: Image & { _type: "image" }
}

function ShowcaseImage({ sanityImage }: Props) {
  const isXs = useMediaQuery("(max-width: 600px)")
  const imageUrl = useSanityImageUrl(sanityImage, { width: isXs ? 600 : 800 })

  return <Img src={imageUrl} alt="Project showcase"/>
}

const Img = styled.img`
  width: 100%;
`

export default ShowcaseImage