import SanityCaptionedImage from "./SanityCaptionedImage";
import { useMediaQuery } from "@mui/material";

type Props = {
  imageAsset: any
  className?: string
}

function MainImage({ imageAsset, ...otherProps }: Props) {
  const isXs = useMediaQuery("(max-width: 600px)")

  return (
    <SanityCaptionedImage
      asset={imageAsset}
      imageWidth={isXs ? 600 : 800}
      {...otherProps}
    />
  )
}

export default MainImage