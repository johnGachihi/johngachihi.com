import { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import { h6 } from "../../style/text";

type Props = PropsWithChildren<{ title: string }>

function PostListLayout({ title, children }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  )
}

const Container = styled.div`
  @media (max-width: 600px) {
    margin-top: 16px;
  }
  
  @media (min-width: 600px) {
    margin-top: 32px;
  }
  
  @media (min-width: 900px) {
    margin-top: 56px;
  }
  
  @media (min-width: 1440px) {
    margin-top: 104px;
  }
`
const Title = styled.div`
  ${h6};
  margin-bottom: 16px;
  @media (min-width: 600px) {
    display: none
  }
`

export default PostListLayout