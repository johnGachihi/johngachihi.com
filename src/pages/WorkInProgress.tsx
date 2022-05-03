/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { h6 } from "../style/text";

function WorkInProgress() {
  return (
    <div css={css`
      height: calc(100vh - 128px);
      display: flex;
      justify-content: center;
      align-items: center;
      ${h6}
    `}>Work in Progress 🛠</div>
  )
}

export default WorkInProgress