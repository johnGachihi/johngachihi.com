import { PostListItemLoading } from "./PostListItem";
import { css } from "@emotion/react";

function PostListLoading() {
  return (
    <div>
      {[...Array(3)].map((_, index) =>
        <PostListItemLoading css={css`margin-bottom: 16px`} key={index} />)
      }
    </div>
  )
}

export default PostListLoading