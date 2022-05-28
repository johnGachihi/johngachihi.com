import { Article, ArticleSummary } from "../../models/article";
import { useQuery } from "react-query";
import { fetchArticle, fetchArticleSummaries } from "../../api/article";

function useArticleSummaries(enabled = true) {
  return useQuery<ArticleSummary[]>(
    'article-summaries',
    fetchArticleSummaries,
    { enabled, suspense: true }
  )
}

function useArticle(slug: string, enabled = true) {
  return useQuery<Article | null>(
    ['article', { slug }],
    () => fetchArticle(slug),
    { enabled, suspense: true }
  )
}

export { useArticleSummaries, useArticle }