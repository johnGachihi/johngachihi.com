import { rest, RestHandler } from "msw";
import { sanityClient } from "../../api/sanity-client";

const config = sanityClient.config()
const sanityUrl = `https://${config.projectId}.api.sanity.io/v${config.apiVersion}*`

const handlers: RestHandler[] = [
  /**
   * Article
   */
  rest.get(sanityUrl, (req) => {
    const tag = req.url.searchParams.get("$tag")
    if (tag === '"article"') {
      // return res(ctx.status(500), ctx.json({ error: "Error for testing"}))
      // return res(ctx.json(article))
    }
  }),

  /**
   * Project
   */
  rest.get(sanityUrl, (req) => {
    const tag = req.url.searchParams.get("$tag")
    if (tag === '"projects"') {
      // return res(json(projectSummaries))
    }
  }),

  rest.get(sanityUrl, (req) => {
    const tag = req.url.searchParams.get("tag")
    if (tag === 'project') {
      // return res(json(project))
    }
  })
]

export default handlers