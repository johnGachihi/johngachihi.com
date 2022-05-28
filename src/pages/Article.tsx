import React from "react"
import ArticleContent from "../components/articles/ArticleContent";
import { useParams } from "react-router-dom";
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/ErrorFallback";

function Article() {
  const { slug } = useParams()

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ArticleContent articleSlug={slug!} />
          </React.Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default Article