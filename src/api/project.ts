import { sanityClient } from "./sanity-client"
import { Block, Image, Slug } from "@sanity/types";
import { formatDate } from "../util/date";

// TODO: Too much repetition on these types
interface RawProject {
  _id: string
  title: string
  slug: Slug
  startedAt: string
  tags: string[] | null // Sanity seems to return null when array is empty
  githubLink?: string
  liveLink?: string
  showcaseMedia?:
    | { youtubeLink: string }
    | { image: Image & { _type: "image" } }
  shortDescription: (Block | Image & { _type: "image" })[]
  technicalDescription: (Block | Image & { _type: "image" })[]
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
  tags: string[] | null // Sanity seems to return null when array is empty
}

export type ProjectSummary = {
  id: string
  title: string
  slug: string
  startedAt: string
  tags: string[] | null // Sanity seems to return null when array is empty
}

async function fetchProjects(): Promise<ProjectSummary[]> {
  const query = `
    *[_type == "project"]  | order(startedAt desc) {
      _id, title, slug, startedAt, tags 
    }
  `
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

async function fetchProject(slug: string): Promise<Project | null> {
  const query = `
    *[_type == "project" && slug.current == $slug]{
      _id,
      title, slug, startedAt, tags,
      githubLink, liveLink,
      showcaseMedia,
      shortDescription,
      technicalDescription
    }[0]
  `

  const project = await sanityClient.fetch<RawProject | null>(
    query,
    { slug },
    { tag: "single-project" }
  )

  return project === null
    ? null
    : {
      ...project,
      id: project._id,
      slug: project.slug.current,
      startedAt: formatDate(project.startedAt, "DD MMM YYYY")
    }
}

export { fetchProjects, fetchProject }