import {css} from "@emotion/react";

const baseText = css`
  font-family: 'Poppins', sans-serif;
`

const h6 = css`
  ${baseText};
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.15px;
`

const body1 = css`
  ${baseText};
  font-size: 16px;
  letter-spacing: 0.5px;
`

const body2 = css`
  ${baseText};
  font-size: 14px;
  letter-spacing: 0.25px;
`

const caption = css`
  ${baseText};
  font-size: 12px;
  letter-spacing: 0.4px;
`

export { body2, body1, h6, caption }