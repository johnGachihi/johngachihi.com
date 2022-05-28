/** @jsxImportSource @emotion/react */
import { FallbackProps } from "react-error-boundary";
import styled from "@emotion/styled";
import { caption, h6 } from "../style/text";
import Button from "@mui/material/Button";
import { css } from "@emotion/react";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <Content>
      <GeneralMessage>Oh no 😲! Erroooor</GeneralMessage>
      <SpecificMessage>{error.message}</SpecificMessage>

      <Button
        css={css`margin-top: 24px`}
        variant="outlined"
        onClick={resetErrorBoundary}
        children="Retry"
      />
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
const GeneralMessage = styled.div`
  ${h6}
  margin-bottom: 8px;
`

const SpecificMessage = styled.div`
  ${caption}
`

export default ErrorFallback