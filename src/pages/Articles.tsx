import React from 'react'
import ArticleList from "../components/articles/ArticleList";
import PostListLoading from '../components/post-list/PostListLoading';
import PostListLayout from "../components/post-list/PostListLayout";

function Articles() {
  return (
    <PostListLayout title="Articles">
      <React.Suspense fallback={<PostListLoading/>}>
        <ArticleList/>
      </React.Suspense>
    </PostListLayout>
  )
}

export default Articles