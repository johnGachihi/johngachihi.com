import {rest} from "msw";
import {sanityClient} from "../../sanity-client";
import projectSummaries from "../data/raw-project-summaries.json"
import projects from "../data/raw-projects.json"

const config = sanityClient.config()
const sanityUrl = `https://${config.projectId}.api.sanity.io/v${config.apiVersion}*`

const fetchProjectsHandler = rest.get(sanityUrl, (req, res, {json}) => {
  const tag = req.url.searchParams.get("tag")
  if (tag === "projects")
    return res(json(projectSummaries))
})

const fetchSingleProjectHandler = rest.get(sanityUrl, (req, res, {json}) => {
  const tag = req.url.searchParams.get("tag")
  if (tag === "single-project") {
    return res(json(projects["ai-exam-invigilator"]))
    // return res(json(projects["kotlin-symbol-processor-ksp-example"]))
  }
})

const handlers = [fetchProjectsHandler, fetchSingleProjectHandler]

export default handlers