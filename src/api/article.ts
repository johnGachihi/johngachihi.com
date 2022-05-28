import { Article, ArticleSummary } from "../models/article";
import { sanityClient } from "./sanity-client";
import { formatDate } from "../util/date";

interface RawArticleSummary extends Omit<ArticleSummary, "tags"> {
  tags: string[] | null // TODO: Figure out how to return empty array when tags is null using GROQ
}

async function fetchArticleSummaries(): Promise<ArticleSummary[]> {
  const query = `
    *[_type == "article"] | order(publishedOn desc) {
      "id": _id,
      title, 
      "slug": slug.current, 
      publishedOn,
      tags
    }
  `
  const rawArticles = await sanityClient.fetch<RawArticleSummary[]>(
    query,
    { tag: "articles" }
  )

  return rawArticles.map(article => ({
    ...article,
    tags: article.tags ?? [],
    publishedOn: formatDate(article.publishedOn, "DD MMM YYYY")
  }))
}


interface RawArticle extends Omit<Article, "tags"> {
  tags: string[] | null
}

async function fetchArticle(slug: string): Promise<Article | null> {
  const query = `
      *[_type == "article" && slug.current == $slug] {
        "id": _id,
        title,
        "slug": slug.current,
        publishedOn,
        tags,
        mainImage,
        content
      }[0]
  `

  const rawArticle = await sanityClient.fetch<RawArticle>(
    query,
    { slug, tag: "article" }
  )

  return rawArticle
    ? { ...rawArticle, tags: rawArticle.tags ?? [] }
    : null
}

export { fetchArticleSummaries, fetchArticle }