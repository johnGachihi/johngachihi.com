import React from 'react'
import ArticleList from "../components/articles/ArticleList";
import PostListLoading from '../components/post-list/PostListLoading';
import PostListLayout from "../components/post-list/PostListLayout";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from '../components/ErrorFallback';
import { QueryErrorResetBoundary } from 'react-query';

function Articles() {
  return (
    <PostListLayout title="Articles">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
            <React.Suspense fallback={<PostListLoading />}>
              <ArticleList/>
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

    </PostListLayout>
  )
}

export default Articles