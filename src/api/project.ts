import { sanityClient } from "./sanity-client"
import { Block, Image, Slug } from "@sanity/types";
import { formatDate } from "../util/date";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RawProject {
  _id: string
  title: string
  slug: Slug
  startedAt: string
  tags: string[]
  githubLink: string
  liveLink: string
  showcaseMedia:
    | { youtubeLink: string }
    | { image: Image & { _type: "image" } }
  shortDescription: (Block | Image)[]
  technicalDescription: (Block | Image)[]
}

export interface Project extends Omit<RawProject, "slug" | "_id"> {
  id: string
  slug: string
}

interface RawProjectSummary {
  _id: string
  title: string
  slug: Slug
  startedAt: string
  tags: string[]
}

export type ProjectSummary = {
  id: string
  title: string
  slug: string
  startedAt: string
  tags: string[]
}

async function fetchProjects(): Promise<ProjectSummary[]> {
  const query = `*[_type == "project"]{ _id, title, slug, startedAt, tags }`
  const rawProjects = await sanityClient.fetch<RawProjectSummary[]>(
    query,
    { tag: "projects" }
  )

  return rawProjects.map(project => ({
    ...project,
    id: project._id,
    slug: project.slug.current,
    startedAt: formatDate(project.startedAt, "DD MMM YYYY")
  }))
}

async function fetchProject(slug: string): Promise<Project> {
  const query = `
    *[_type == "project" && slug.current == $slug]{
      _id,
      title, slug, startedAt, tags,
      githubLink, liveLink,
      showcaseMedia,
      shortDescription,
      longDescription
    }[0]
  `

  const project = await sanityClient.fetch<RawProject>(
    query,
    { slug },
    { tag: "single-project" }
  )

  return {
    ...project,
    id: project._id,
    slug: project.slug.current
  }
}

export { fetchProjects, fetchProject }