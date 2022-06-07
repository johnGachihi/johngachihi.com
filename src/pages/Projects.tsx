import ProjectList from "../components/project/ProjectList";
import PostListLayout from "../components/post-list/PostListLayout";
import React from "react";
import ErrorFallback from "../components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from 'react-query';
import PostListLoading from "../components/post-list/PostListLoading";

function Projects() {
  return (
    <PostListLayout title="Projects">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
            <React.Suspense fallback={<PostListLoading />}>
              <ProjectList/>
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </PostListLayout>

  )
}

export default Projects