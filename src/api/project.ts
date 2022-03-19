import {sanityClient} from "./sanity-client"
import {Block, Image, SanityDocument, Slug} from "@sanity/types";
import {formatDate} from "../util/date";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Project extends SanityDocument {
  title: string;
  slug: Slug;
  startedAt: string;
  tags: string[];
  githubLink: string;
  liveLink: string;
  showcaseMedia:
    | { youtubeLink: string }
    | Image & { _type: "image" };
  shortDescription: (Block | Image)[];
  technicalDescription: (Block | Image)[];
}

interface RawProjectSummary extends SanityDocument {
  title: string;
  slug: Slug;
  startedAt: string;
  tags: string[];
}

export type ProjectSummary = {
  id: string;
  title: string;
  slug: string;
  startedAt: string;
  tags: string[];
}

async function fetchProjects(): Promise<ProjectSummary[]> {
  const query = `*[_type == "project"]{ _id, title, slug, startedAt, tags }`
  const rawProjects = await sanityClient.fetch<RawProjectSummary[]>(
    query,
    {tag: "projects"}
  )

  return rawProjects.map(project => ({
    ...project,
    id: project._id,
    slug: project.slug.current,
    startedAt: formatDate(project.startedAt, "DD MMM YYYY")
  }))
}

export {fetchProjects}