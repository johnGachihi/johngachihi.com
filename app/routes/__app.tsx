import styled from "@emotion/styled";
import { Outlet } from "@remix-run/react";
import { AppBar } from "~/components/AppBar";

export default function Index() {
  return (
    <>
      <AppBar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main`
  @media (min-width: 0px) {
    margin: 0 16px;
  }

  @media (min-width: 600px) {
    margin: 0 32px;
  }

  @media (min-width: 905px) {
    margin: 0 auto;
    width: 840px;
  }

  @media (min-width: 1240px) {
    margin: 0 200px;
    width: unset;
  }

  @media (min-width: 1440px) {
    margin: 0 auto;
    width: 1040px;
  }
`;
