import { useLoaderData, useSearchParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import PostTitle from "~/components/post/post-title";
import { fetchProject } from "~/models/project.server";
import { useMemo, useState } from "react";
import VideoPlayer from "~/components/post/video-player";
import { ProjectLink } from "~/components/project/project-link";
import Tags from "~/components/tags";
import { CSSTransition } from "react-transition-group";
import Icon from '@mdi/react'
import { mdiChevronUp, mdiChevronDown, mdiGithub, mdiLink } from '@mdi/js'
import { type LoaderFunction, type MetaFunction, Response } from "@remix-run/node";
import style from "~/styles/project.css";
import postStyle from "~/styles/post.css";
import hljsStyle from "highlight.js/styles/intellij-light.css";


export function links() {
  return [
    { rel: "stylesheet", href: style },
    { rel: "stylesheet", href: postStyle },
    { rel: "stylesheet", href: hljsStyle },
  ]
}

type LoaderData = {
  project: Exclude<Awaited<ReturnType<typeof fetchProject>>, null>;
};
export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "slug param required");

  const project = await fetchProject(params.slug)

  if (!project) {
    throw new Response("Project not found", { status: 404 });
  }

  return { project };
};

export const meta: MetaFunction = ({ data }) => {
  if (!data?.project) {
    return { title: "Project not found" }
  }
  return { title: data.project.title }
}

export default function Project() {
  const { project } = useLoaderData<LoaderData>();

  const [searchParams] = useSearchParams();

  const [isShowTechnicalDesc, setIsShowTechnicalDesc] = useState(false)

  const videoStartTime = useMemo(() => {
    const startTime = searchParams.get("v")

    if (startTime && Number.isNaN(startTime)) {
      invariant(false, "Invalid `v` (video start time) query param")
    }

    return startTime ? Number(startTime) : undefined
  }, [searchParams])

  const showcaseMedia = useMemo(() => {
    if ("image" in project.showcaseMedia) {
      return <div dangerouslySetInnerHTML={{ __html: project.showcaseMedia.image }} />
    } else {
      return (
        <VideoPlayer
          className="aspect-video"
          src={project.showcaseMedia.muxVideoPlaybackId}
          shouldPlay={false}
          meta={{ title: project.title, id: project.slug }}
          startTime={videoStartTime}
        />
      )
    }
  }, [project.showcaseMedia, project.slug, project.title, videoStartTime])

  return (
    <div className="max-w-screen-md mx-auto mt-2 sm:mt-6 2xl:mt-12">
      <header>
        <PostTitle className="mb-6" title={project.title} date={project.startedAt} />

        {showcaseMedia && <div className="mb-6">{showcaseMedia}</div>}

        {(project.githubLink || project.liveLink) &&
          <div className="flex mb-4 md:mb-6">
            {project.githubLink &&
              <ProjectLink
                className="mr-2"
                icon={<Icon path={mdiGithub} className="w-6" />}
                text="GitHub Repo"
                link={project.githubLink}
              />
            }

            {project.liveLink &&
              <ProjectLink
                icon={<Icon path={mdiLink} className="w-6" />}
                text="Live Project"
                link={project.liveLink}
              />
            }
          </div>
        }

        <Tags tags={project.tags} />
      </header>

      <main className="content mt-10 max-w-prose">
        <div dangerouslySetInnerHTML={{ __html: project.shortDescription }} />

        {project.technicalDescription &&
          <button
            className="emphatic-link mt-8"
            onClick={() => setIsShowTechnicalDesc((desc) => !desc)}
          >
            <span className="mr-1">Technical Description</span>
            {isShowTechnicalDesc
              ? <Icon path={mdiChevronUp} size="24px" className="w-6" />
              : <Icon path={mdiChevronDown} size="24px" className="w-6" />}
          </button>
        }

        {/* @ts-ignore */}
        <CSSTransition
          in={isShowTechnicalDesc}
          classNames="technical-desc"
          timeout={100}
          mountOnEnter
        >
          <div
            className="technical-desc mt-8"
            dangerouslySetInnerHTML={{ __html: project.technicalDescription }}
          />
        </CSSTransition>
      </main>
    </div>
  );
}
