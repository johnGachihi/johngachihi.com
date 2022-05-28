/** @jsxImportSource @emotion/react */
import { ArticleSummary } from "../../models/article";
import { useArticleSummaries } from "./query-hooks";
import { useMemo } from "react";
import PostListItem from "../post-list/PostListItem";
import { css } from "@emotion/react";

type Props = { _articles?: ArticleSummary[] }

function ArticleList({ _articles }: Props) {
  const { data } = useArticleSummaries(!_articles)

  const articles = useMemo(
    () => _articles ?? data,
    [_articles, data]
  )

  return (
    <div>
      {articles?.map(({ publishedOn, ...article }: ArticleSummary) =>
        (<PostListItem
          css={css`margin-bottom: 16px`}
          {...article}
          key={article.id}
          date={publishedOn}
        />))
      }
    </div>
  )
}

export default ArticleList