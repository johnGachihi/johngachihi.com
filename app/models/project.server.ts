import type { Block } from "@sanity/types";
import type { CaptionedImage, CodeBlock } from "~/sanity.types";
import { createSanityClient, formatDate, sanityImageUrlFor } from "~/utils";
import {
  captionedImageToHtml,
  postPortableTextToHtml,
} from "~/utils/portable-text.server";

export interface ProjectSummary {
  id: string;
  // TODO: Eeeh?
  showcaseMedia?: {
    type: "image" | "muxVideo";
    src: string;
  };
  title: string;
  slug: string;
  startedAt: string;
  tags: string[];
}

interface RawProjectSummary extends Omit<ProjectSummary, "showcaseMedia"> {
  showcaseMedia?:
    | { image: CaptionedImage }
    | { muxVideo: { playbackId: string } };
}

export async function fetchProjectSummaries(): Promise<ProjectSummary[]> {
  const query = `
    *[_type == "project"]  | order(startedAt desc) {
      "id": _id, title, "slug": slug.current, startedAt,
      showcaseMedia, "tags": coalesce(tags, [])
    }
  `;
  const rawProjects = await createSanityClient().fetch<RawProjectSummary[]>(
    query,
    { tag: "project-summaries" }
  );

  return rawProjects.map((project) => ({
    ...project,
    // TODO: Is it possible to format date in GROQ?
    startedAt: formatDate(project.startedAt, "DD MMM YYYY"),
    showcaseMedia: project.showcaseMedia
      ? processShowcaseMedia(project.showcaseMedia)
      : undefined,
  }));
}

function processShowcaseMedia(
  showcaseMedia: NonNullable<RawProjectSummary["showcaseMedia"]>
): NonNullable<ProjectSummary["showcaseMedia"]> {
  if ("image" in showcaseMedia) {
    return {
      type: "image",
      src: sanityImageUrlFor(showcaseMedia.image).width(600).url(),
    };
  } else {
    return {
      type: "muxVideo",
      src: showcaseMedia.muxVideo.playbackId,
    };
  }
}

interface Project extends Omit<ProjectSummary, "showcaseMedia"> {
  showcaseMedia?:
    | { image: string }
    | { muxVideo: { playbackId: string } };
  githubLink?: string;
  liveLink?: string;
  shortDescription: string;
  technicalDescription: string;
}

interface RawProject
  extends Omit<
    Project,
    "showcaseMedia" | "shortDescription" | "technicalDescription"
  > {
  showcaseMedia?:
    | { image: CaptionedImage }
    | { muxVideo: { playbackId: string } };
  shortDescription: (Block | CaptionedImage | CodeBlock)[];
  technicalDescription: (Block | CaptionedImage | CodeBlock)[];
}

function processProject(rawProject: RawProject): Project {
  const {
    showcaseMedia,
    shortDescription,
    technicalDescription,
    startedAt,
    ...rest
  } = rawProject;

  return {
    showcaseMedia:
      !!showcaseMedia && "image" in showcaseMedia
        ? {
            image: captionedImageToHtml([showcaseMedia.image], {
              withYMargin: false,
            }),
          }
        : showcaseMedia,
    shortDescription: postPortableTextToHtml(rawProject.shortDescription),
    technicalDescription: postPortableTextToHtml(
      rawProject.technicalDescription
    ),
    startedAt: formatDate(startedAt, "DD MMM YYYY"),
    ...rest,
  };
}

export async function fetchProject(slug: string): Promise<Project | null> {
  const query = `
    *[_type == "project" && slug.current == $slug]{
      "id": _id, title, "slug": slug.current, startedAt, githubLink,
      liveLink, showcaseMedia, shortDescription, technicalDescription,
      "tags": coalesce(tags, [])
    }[0]
  `;
  const project = await createSanityClient().fetch<RawProject | null>(query, {
    slug,
    tag: "project",
  });

  return project === null ? null : processProject(project);
}
