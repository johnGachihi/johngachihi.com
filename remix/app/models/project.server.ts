import { Block, Image } from "@sanity/types";
import { CaptionedImage, CodeBlock } from "~/sanity.types";
import { createSanityClient, formatDate } from "~/utils";
import { portableTextToHTML } from "~/utils/portable-text.server";

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
      "tags": select(
        tags == null => [],
        tags != null => tags
      )
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
  showcaseMedia?: { youtubeLink: string } | string;
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
        ? portableTextToHTML([showcaseMedia.image])
        : showcaseMedia,
    shortDescription: portableTextToHTML(rawProject.shortDescription),
    technicalDescription: portableTextToHTML(rawProject.technicalDescription),
    startedAt: formatDate(startedAt, "DD MMM YYYY"),
    ...rest,
  };
}

export async function fetchProject(slug: string): Promise<Project | null> {
  const query = `
    *[_type == "project" && slug.current == $slug]{
      "id": _id, title, "slug": slug.current, startedAt, tags,
      githubLink, liveLink, showcaseMedia, shortDescription,
      technicalDescription
    }[0]
  `;
  const project = await createSanityClient().fetch<RawProject | null>(query, {
    slug,
  });

  return project === null ? null : processProject(project);
}
