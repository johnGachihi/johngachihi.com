import ProjectList from "../components/project/ProjectList";
import PostListLayout from "../components/post-list/PostListLayout";
import React from "react";
import PostListLoading from "../components/post-list/PostListLoading";

function Projects() {
  return (
    <PostListLayout title="Projects">
      <React.Suspense fallback={<PostListLoading/>}>
        <ProjectList/>
      </React.Suspense>
    </PostListLayout>
  )
}

export default Projects