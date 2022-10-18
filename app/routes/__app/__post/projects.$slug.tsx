import type {LoaderFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import invariant from "tiny-invariant";
import PostTitle from "~/components/post/post-title";
import {fetchProject} from "~/models/project.server";
import {useMemo, useState} from "react";
import VideoPlayer from "~/components/post/video-player";
import {ProjectLink} from "~/components/project/project-link";
import Tags from "~/components/tags";
import styled from "@emotion/styled";
import {emphaticLink} from "~/styles/link";
import {CSSTransition} from "react-transition-group";
import Icon from '@mdi/react'
import {mdiChevronUp, mdiChevronDown, mdiGithub, mdiLink} from '@mdi/js'
import {type MetaFunction, Response} from "@remix-run/node";

type LoaderData = {
    project: Exclude<Awaited<ReturnType<typeof fetchProject>>, null>;
};
export const loader: LoaderFunction = async ({params}) => {
    invariant(params.slug, "slug param required");

    const project = await fetchProject(params.slug)

    if (!project) {
        throw new Response("Project not found", {status: 404});
    }

    return {project};
};

export const meta: MetaFunction = ({data}) => {
    if (!data?.project) {
        return {title: "Project not found"}
    }
    return {title: data.project.title}
}

export default function Project() {
    const {project} = useLoaderData<LoaderData>();

    const [isShowTechnicalDesc, setIsShowTechnicalDesc] = useState(false)

    const showcaseMedia = useMemo(() => {
        if (!project.showcaseMedia) return

        return "youtubeLink" in project.showcaseMedia
            ? <VideoPlayer url={project.showcaseMedia.youtubeLink}/>
            : <div dangerouslySetInnerHTML={{__html: project.showcaseMedia.image}}/>
    }, [project.showcaseMedia])

    return (
        <>
            <header>
                <PostTitle className="mb-6" title={project.title} date={project.startedAt}/>

                {showcaseMedia && <div className="mb-6">{showcaseMedia}</div>}

                {(project.githubLink || project.liveLink) &&
                    <div className="flex mb-4 md:mb-6">
                        {project.githubLink &&
                            <ProjectLink
                                className="mr-2"
                                icon={<Icon path={mdiGithub} className="w-6"/>}
                                text="GitHub Repo"
                                link={project.githubLink}
                            />
                        }

                        {project.liveLink &&
                            <ProjectLink
                                icon={<Icon path={mdiLink} className="w-6"/>}
                                text="Live Project"
                                link={project.liveLink}
                            />
                        }
                    </div>
                }

                <Tags tags={project.tags}/>
            </header>

            <main className="post-content mt-10 max-w-prose">
                <div dangerouslySetInnerHTML={{__html: project.shortDescription}}/>

                {project.technicalDescription &&
                    <ShowTechnicalDescriptionButton
                        onClick={() => setIsShowTechnicalDesc((desc) => !desc)}
                    >
                        <span className="mr-1">Technical Description</span>
                        {isShowTechnicalDesc
                            ? <Icon path={mdiChevronUp} size="24px" className="w-6"/>
                            : <Icon path={mdiChevronDown} size="24px" className="w-6"/>}
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
                        className="mt-8"
                        dangerouslySetInnerHTML={{__html: project.technicalDescription}}
                    />
                </CSSTransition>
            </main>
        </>
    );
}

const ShowTechnicalDescriptionButton = styled.button`
  border: none;
  padding: 0;
  margin-top: 32px;
  ${emphaticLink};
`

const TechnicalDescription = styled.div`
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
