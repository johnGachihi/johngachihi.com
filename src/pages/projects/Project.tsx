import useProject from "../../components/projects/useProject";
import { useMemo } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ShowcaseVideoPlayer from "../../components/project/ShowcaseVideoPlayer";
import ShowcaseImage from "../../components/project/ShowcaseImage";

function Project() {
  const { slug } = useParams()
  const { data, isSuccess } = useProject(slug)

  const showCaseMedia = useMemo(() => {
    if (data?.showcaseMedia) {
      if ("image" in data.showcaseMedia) {
        return <ShowcaseImage sanityImage={data.showcaseMedia.image}/>
      } else {
        return <ShowcaseVideoPlayer url={data.showcaseMedia.youtubeLink}/>
      }
    }
  }, [data])

  if (isSuccess)
    return (
      <Content>
        {showCaseMedia}
      </Content>
    )
  else
    return <div>Loading or error</div>
}

const Content = styled.article`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;
  
  @media (max-width: 600px) {
    margin-top: 8px
  }
`

export default Project