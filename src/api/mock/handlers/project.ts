import {rest} from "msw";
import {sanityClient} from "../../sanity-client";
import projectSummaries from "../data/project-summaries.json"

const config = sanityClient.config()
const sanityUrl = `https://${config.projectId}.api.sanity.io/v${config.apiVersion}*`

const fetchProjectsHandler = rest.get(sanityUrl, (req, res, {json}) => {
  const tag = req.url.searchParams.get("tag")
  if (tag === "projects")
    return res(json(projectSummaries))
})

const handlers = [fetchProjectsHandler]

export default handlers