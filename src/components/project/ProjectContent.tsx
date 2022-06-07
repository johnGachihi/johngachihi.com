/** @jsxImportSource @emotion/react */
import { Project } from "../../api/project";
import useProject from "./useProject";
import { useMemo, useState } from "react";
import NotFound from "../../pages/NotFound";
import { postContent } from "../../style/post";
import Header from "../post/Header";
import { css } from "@emotion/react";
import ShowcaseVideoPlayer from "./ShowcaseVideoPlayer";
import ProjectLink from "./ProjectLink";
import GitHub from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import MainImage from "../post/MainImage";
import { body1, caption } from "../../style/text";
import SanityPostContent from "../post/SanityPostContent";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { emphaticLink } from "../../style/link";
import { CSSTransition } from "react-transition-group";

type Props = {
  slug: string
  _project?: Project
}

function ProjectContent({ slug, _project }: Props) {
  const { data } = useProject(slug, !_project)

  const [isShowTechnicalDesc, setIsShowTechnicalDesc] = useState(false)

  const project = useMemo(
    () => _project ?? data,
    [data, _project]
  )

  const showCaseMedia = useMemo(() => {
    if (project?.showcaseMedia) {
      if ("image" in project.showcaseMedia) {
        return <MainImage imageAsset={project.showcaseMedia.image}/>
      } else {
        return <ShowcaseVideoPlayer url={project.showcaseMedia.youtubeLink}/>
      }
    }
  }, [project])

  return !project ? <NotFound/> : (
    <article css={postContent}>
      <Header
        css={css`margin-bottom: 24px`}
        title={project.title}
        date={project.startedAt}
      />

      {showCaseMedia}

      <div css={css`
          margin-top: 16px;
          display: flex;
        `}>
        {project.githubLink &&
          <ProjectLink
            css={css`margin-right: 8px`}
            icon={<GitHub/>}
            text="GitHub Repo"
            link={project.githubLink}
          />
        }
        {project.liveLink &&
          <ProjectLink
            icon={<LinkIcon/>}
            text="Live Project"
            link={project.liveLink}
          />
        }
      </div>

      {/* TODO: Refactor (DRY) */}
      {project.tags &&
        <div
          css={css`
            margin: 24px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 4px 12px;
          `}
        >
          {project.tags.map(tag => <span css={css`${caption}`} key={tag}>#{tag}</span>)}
        </div>
      }

      <SanityPostContent
        css={css`
            margin-top: 24px;
            margin-bottom: 40px;
          `}
        content={project.shortDescription}
      />

      {project.technicalDescription &&
        <ShowTechnicalDescriptionButton
          onClick={() => setIsShowTechnicalDesc((desc) => !desc)}
        >
          <span css={css`${body1}; margin-right: 4px;`}>Technical Description</span>
          {isShowTechnicalDesc ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
        </ShowTechnicalDescriptionButton>
      }

      {/* @ts-ignore */}
      <CSSTransition
        in={isShowTechnicalDesc}
        classNames="technical-desc"
        timeout={100}
        mountOnEnter
      >
        <TechnicalDescription
          css={css`margin-top: 32px`}
          content={project.technicalDescription}
        />
      </CSSTransition>
    </article>
  )
}

const ShowTechnicalDescriptionButton = styled.button`
  border: none;
  padding: 0;
  ${emphaticLink};
`
const TechnicalDescription = styled(SanityPostContent)`
  &.technical-desc-enter {
    opacity: 0;
    transform: translateY(-20px);
  }
  
  &.technical-desc-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 100ms, transform 100ms;
  }
  
  &.technical-desc-exit {
    opacity: 1;
  }
  
  &.technical-desc-exit-active {
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 100ms, transform 100ms;
  }
  
  &.technical-desc-exit-done {
    display: none;
  }
`


export default ProjectContent