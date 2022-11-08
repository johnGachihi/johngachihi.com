import type { Block } from "@sanity/types";
import type { CaptionedImage, CodeBlock } from "~/sanity.types";
import { createSanityClient, formatDate } from "~/utils";
import { captionedImageToHtml, postPortableTextToHtml } from "~/utils/portable-text.server";

interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  startedAt: string;
  tags: string[];
}

export async function fetchProjectSummaries(): Promise<ProjectSummary[]> {
  const query = `
    *[_type == "project"]  | order(startedAt desc) {
      "id": _id, title, "slug": slug.current, startedAt,
      "tags": coalesce(tags, [])
    }
  `;
  const rawProjects = await createSanityClient().fetch<ProjectSummary[]>(query);

  return rawProjects.map((project) => ({
    ...project,
    // TODO: Is it possible to format date in GROQ?
    startedAt: formatDate(project.startedAt, "DD MMM YYYY"),
  }));
}

interface Project extends ProjectSummary {
  githubLink?: string;
  liveLink?: string;
  showcaseMedia?: { youtubeLink: string } | { image: string };
  shortDescription: string;
  technicalDescription: string;
}

interface RawProject
  extends Omit<
    Project,
    "showcaseMedia" | "shortDescription" | "technicalDescription"
  > {
  showcaseMedia?: { youtubeLink: string } | { image: CaptionedImage };
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
        ? { image: captionedImageToHtml([showcaseMedia.image], { withYMargin: false }) }
        : showcaseMedia,
    shortDescription: postPortableTextToHtml(rawProject.shortDescription),
    technicalDescription: postPortableTextToHtml(rawProject.technicalDescription),
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
  });

  return project === null ? null : processProject(project);
}
