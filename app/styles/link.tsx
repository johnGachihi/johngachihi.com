import { css } from "@emotion/react";

const emphaticLink = css`
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: #e8e8e8;
  border-bottom: 1px solid black;
  transition: background-color 200ms ease;
  
  &:hover {
    background-color: #b6b6b6
  }
`

export { emphaticLink }
