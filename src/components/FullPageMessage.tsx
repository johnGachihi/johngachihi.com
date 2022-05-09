/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren } from "react";

type Props = {
  className?: string
}

function FullPageMessage({ children, className }: PropsWithChildren<Props>) {
  return (
    <div
      className={className}
      css={css`
        height: calc(100vh - 128px);
        display: flex;
        justify-content: center;
        align-items: center;
      `}>
      {children}
    </div>
  )
}

export default FullPageMessage