import styled from "@emotion/styled";
import { Outlet } from "@remix-run/react";

export default function PostLayout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}

const Main = styled.main`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 200px;

  @media (max-width: 600px) {
    margin-top: 8px;
  }

  @media (min-width: 600px) {
    margin-top: 24px;
  }

  @media (min-width: 1440px) {
    margin-top: 48px;
  }
`;
