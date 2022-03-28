/** @jsxImportSource @emotion/react */
import useProject from "../../components/projects/useProject";
import { useMemo } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import ShowcaseVideoPlayer from "../../components/project/ShowcaseVideoPlayer";
import ShowcaseImage from "../../components/project/ShowcaseImage";
import Body from "../../components/project/Body";
import Header from "../../components/project/Header";
import { css } from "@emotion/react";
import ProjectLink from "../../components/project/ProjectLink";
import GitHub from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { body1, caption } from "../../style/text";
import { emphaticLink } from "../../style/link";

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
        <Header
          css={css`margin-bottom: 24px`}
          title={data.title}
          startedOn={data.startedAt}
        />

        {showCaseMedia}

        <div css={css`
          margin-top: 16px;
          display: flex;
        `}>
          {data.githubLink &&
            <ProjectLink
              css={css`margin-right: 8px`}
              icon={<GitHub/>}
              text="GitHub Repo"
              link={data.githubLink}
            />
          }
          {data.liveLink &&
            <ProjectLink
              icon={<LinkIcon/>}
              text="Live Project"
              link={data.liveLink}
            />
          }
        </div>

        <div css={css`margin-top: 24px`}>
          {data.tags.map(tag =>
            <span css={css`${caption}; margin-right: 8px;`}>#{tag}</span>
          )}
        </div>

        <Body css={
          css`
            margin-top: 24px;
            margin-bottom: 42px;
          `}
          content={data.shortDescription}
        />

        <ShowTechnicalDescriptionButton>
          <span css={css`${body1}; margin-right: 4px;`}>Technical Description</span>
          <ExpandMoreIcon/>
        </ShowTechnicalDescriptionButton>
      </Content>
    )
  else
    return <div>Loading...</div>
}

const Content = styled.article`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 200px;
  
  @media (max-width: 600px) {
    margin-top: 8px
  }
  
  @media (min-width: 600px) {
    margin-top: 24px;
  }
  
  @media (min-width: 1440px) {
    margin-top: 48px;
  }
`

const ShowTechnicalDescriptionButton = styled.button`
  border: none;
  padding: 0;
  ${emphaticLink};
`

export default Project