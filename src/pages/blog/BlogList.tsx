/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { body1 } from "../../style/text";


function BlogList() {
  return (
    <div css={css`
      height: calc(100vh - 128px);
      display: flex;
      justify-content: center;
      align-items: center;
      ${body1}
    `}>Work in Progress</div>
  )
}

export default BlogList