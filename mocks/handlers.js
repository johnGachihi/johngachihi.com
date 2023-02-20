const { rest } = require('msw')
const article = require('./data/article.json')
const articleSummaries = require('./data/article-summaries.json')
const project = require('./data/project.json')
const projectSummaries = require('./data/project-summaries.json')

const sanityProjectId = process.env.SANITY_PROJECT_ID
const sanityUrl = `https://${sanityProjectId}.api.sanity.io*`

exports.handlers = [
  // For Sanity API
  rest.get(sanityUrl, async (req, res, ctx) => {
    if (req.url.searchParams.get("$tag") === `"article-summaries"`) {
      return res(ctx.json(articleSummaries))
    } else if (req.url.searchParams.get("$tag") === `"article"`) {
      return res(ctx.json(article))
    } else if (req.url.searchParams.get("$tag") === `"project-summaries"`) {
      return res(ctx.json(projectSummaries))
    } else if (req.url.searchParams.get("$tag") === `"project"`) {
      return res(ctx.json(project))
    }

    return req.passthrough()
  }),

  rest.get(/http:\/\/localhost:\d+\/.*/, async req => req.passthrough()),
  rest.post(/http:\/\/localhost:\d+\/.*/, async req => req.passthrough()),
]