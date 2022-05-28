/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Block, Image } from "@sanity/types";
import { useMemo } from "react";
import { PortableText } from "@portabletext/react";
import { body1, h5, h6 } from "../../style/text";
import styled from "@emotion/styled";
import SanityCaptionedImage from "./SanityCaptionedImage";
import CodeBlock from "./CodeBlock";

type CaptionedImage = Image & {
  _type: "captionedImage",
  caption: Block[],
  alt: string
}

type Props = {
  // TODO: Include code-block type in content
  content: (Block | CaptionedImage)[]
  className?: string
}

function SanityPostContent({ content, ...otherProps }: Props) {
  const components = useMemo(() => ({
    block: {
      h1: ({ children }: any) => <Heading4 children={children}/>,
      h2: ({ children }: any) => <Heading5 children={children}/>,
      h3: ({ children }: any) => <Heading6 children={children}/>,
      normal: ({ children }: any) =>
        <p css={css`${body1}; margin: 8px 0 16px`} children={children}/>
    },
    marks: {
      link: ({ value, children }: any) =>
        <a css={css`text-decoration: underline`} href={value.href}>{children}</a>,
      code: ({ children }: any) => <code css={css`background: #eee`}>{children}</code>
    },
    types: {
      captionedImage: ({ value }: any) =>
        <SanityCaptionedImage
          asset={value}
          imageWidth={600}
          css={css`width: 100%; margin: 40px 0`}/>,
      codeBlock: ({ value }: any) =>
        <CodeBlock language={value.language} code={value.code}/>
    },
    listItem: {
      bullet: ({ children }: any) => <ListItem children={children}/>,
      number: ({ children }: any) => <ListItem children={children}/>
    }
  }), [])

  return (
    <div css={css`max-width: 680px;`} {...otherProps}>
      <PortableText value={content} components={components}/>
    </div>
  )
}

const heading = css`
  margin: 0;
  font-weight: bold;
  &:first-child {
    margin-top: 0 !important;
  }
`

const Heading4 = styled.h4`
  ${h5};
  ${heading};
  margin-top: 56px;
`
const Heading5 = styled.h5`
  ${h6};
  ${heading}
  margin-top: 40px;
`
const Heading6 = styled.h5`
  ${body1};
  ${heading}
  margin-top: 24px;
`

const ListItem = styled.li`
  ${body1};
  margin-bottom: 12px;
`

export default SanityPostContent