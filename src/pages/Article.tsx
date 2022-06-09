import React from "react"
import ArticleContent from "../components/articles/ArticleContent";
import { useParams } from "react-router-dom";

function Article() {
  const { slug } = useParams()

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ArticleContent articleSlug={slug!}/>
    </React.Suspense>
  )
}

export default Article