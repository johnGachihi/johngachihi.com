/** @jsxImportSource @emotion/react */
import { useArticle } from "./query-hooks";
import { Article } from "../../models/article";
import { useMemo } from "react";
import { postContent } from "../../style/post";
import Header from "../post/Header";
import MainImage from "../post/MainImage";
import SanityPostContent from "../post/SanityPostContent";
import { css } from "@emotion/react";
import { caption } from "../../style/text";
import NotFound from "../../pages/NotFound";

interface Props {
  articleSlug: string
  _article?: Article
}

function ArticleContent({ articleSlug, _article }: Props) {
  const { data } = useArticle(articleSlug, !_article)

  const article = useMemo(
    () => _article ?? data,
    [_article, data]
  )

  if (!article) return <NotFound />

  return (
    <div css={postContent}>
      <Header
        css={css`margin-bottom: 24px`}
        title={article.title}
        date={article.publishedOn}
      />
      <MainImage
        css={css`width: 100%; margin-bottom: 32px`}
        imageAsset={article.mainImage}
      />

      {/* TODO: Refactor (DRY)*/}
      <div
        css={css`
          margin: 24px 0;
          display: flex;
          flex-wrap: wrap;
          gap: 4px 12px;
        `}
      >
        {article.tags.map(tag =>
          <span css={css`${caption}`}>#{tag}</span>
        )}
      </div>

      <SanityPostContent content={article.content}/>
    </div>
  )
}

export default ArticleContent