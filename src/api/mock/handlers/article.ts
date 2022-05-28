import { rest } from "msw";
import articleSummaries from "../data/raw-article-summaries.json";
import article from "../data/raw-article.json";
import { sanityClient } from "../../sanity-client";

const config = sanityClient.config()
const sanityUrl = `https://${config.projectId}.api.sanity.io/v${config.apiVersion}*`

const fetchArticlesHandler = rest.get(sanityUrl, (req, res, { json, status }) => {
  const tag = req.url.searchParams.get("$tag")

  // TODO: Remove
  // return res(status(500), json({ error: "500: Internal server error" }))

  if (tag === '"articles"')
    return res(json(articleSummaries))
})

const handlers = [
  rest.get(sanityUrl, (req, res, ctx) => {
    const tag = req.url.searchParams.get("$tag")
    if (tag === '"article"') {
      // return res(ctx.status(500), ctx.json({ error: "Error for testing"}))
      // return res(ctx.json(article))
    }
  })
]

export { fetchArticlesHandler, handlers }