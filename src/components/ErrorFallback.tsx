/** @jsxImportSource @emotion/react */
import { FallbackProps } from "react-error-boundary";
import styled from "@emotion/styled";
import { body2, h6 } from "../style/text";
import { css } from "@emotion/react";

function ErrorFallback({ error }: FallbackProps) {
  return (
    <Content>
      <div
        css={css`${h6}; margin-bottom: 8px; text-align: center`}
      >
        Oops, there was an error. Try reloading the page
      </div>
      <pre css={css`${body2}; text-align: center`}>{error.message}</pre>
    </Content>
  )
}

const Content = styled.div`
  height: 300px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default ErrorFallback