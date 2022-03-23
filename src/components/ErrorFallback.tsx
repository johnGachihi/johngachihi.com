import { FallbackProps } from "react-error-boundary";
import styled from "@emotion/styled";
import { caption, h6 } from "../style/text";

function ErrorFallback({ error }: FallbackProps) {
  return (
    <Content>
      <GeneralMessage>Oh no 😲! Erroooor</GeneralMessage>
      <SpecificMessage>{error.message}</SpecificMessage>
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