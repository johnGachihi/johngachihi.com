import { Block, Image } from "@sanity/types";
import { createSanityClient, formatDate } from "~/utils";

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
  showcaseMedia?:
    | { youtubeLink: string }
    | { image: Image & { _type: "image" } };
  shortDescription: (Block | CaptionedImage)[];
  technicalDescription: (Block | CaptionedImage)[];
}

export async function fetchProject(slug: string): Promise<Project | null> {
  const query = `
    *[_type == "project" && slug.current == $slug]{
      "id": _id, title, "slug": slug.current, startedAt, tags,
      githubLink, liveLink, showcaseMedia, shortDescription,
      technicalDescription
    }[0]
  `;
  const project = await createSanityClient().fetch<Project | null>(query, {
    slug,
  });

  return project === null
    ? null
    : {
        ...project,
        startedAt: formatDate(project.startedAt, "DD MMM YYYY"),
      };
}
