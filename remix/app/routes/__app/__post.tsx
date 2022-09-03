import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Outlet } from "@remix-run/react";
import { body1, caption, h5, h6 } from "~/styles/text";

import hljsStyle from "highlight.js/styles/intellij-light.css";

export function links() {
  return [{ rel: "stylesheet", href: hljsStyle }];
}

export default function PostLayout() {
  return (
    <Main>
      <Outlet />
    </Main>
  );
}

const heading = css`
  margin: 0;
  font-weight: bold;
  &:first-child {
    margin-top: 0 !important;
  }
`;

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

  a {
    text-decoration: underline;
  }

  .caption {
    ${caption}
  }


  h1 {
    ${h5}
    ${heading}
    margin-top: 56px;
  }

  h2 {
    ${h6}
    ${heading}
    margin-top: 40px;
  }

  h3 {
    ${body1}
    ${heading}
    margin-top: 24px;
  }

  p {
    margin: 8px 0 16px;
  }

  .code-block-container {
    margin: 32px 0;
    border: 1px solid #afafaf;
    border-radius: 7px;
    font-size: 16px;
    overflow-x: auto;

    pre {
      margin: 24px;
      width: fit-content;
    }
  }
`;
