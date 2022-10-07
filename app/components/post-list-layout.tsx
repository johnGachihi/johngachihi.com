import type { PropsWithChildren } from "react";
import styled from "@emotion/styled";
import {h4, h6} from "~/styles/text";

type Props = PropsWithChildren<{ title: string }>;

function PostListLayout({ title, children }: Props) {
  return (
    <>
      <Title>{title}</Title>
      {children}
    </>
  );
}

const Title = styled.h2`
  ${h6};
  margin-top: 8px;
  margin-bottom: 16px;
  @media (min-width: 600px) {
    ${h4} 
    margin-bottom: 24px;
  }
`;

export default PostListLayout;
