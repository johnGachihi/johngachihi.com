/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { h6 } from "../style/text";
import { PropsWithChildren } from "react";

function FullPageMessage({ children }: PropsWithChildren<{}>) {
  return (
    <div css={css`
      height: calc(100vh - 128px);
      display: flex;
      justify-content: center;
      align-items: center;
      ${h6}
    `}>
      {children}
    </div>
  )
}

export default FullPageMessage