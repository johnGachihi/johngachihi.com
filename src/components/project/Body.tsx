/** @jsxImportSource @emotion/react */
import { PropsWithChildren, useMemo } from "react";
import { Block, Image } from "@sanity/types";
import { PortableText } from "@portabletext/react"
import styled from "@emotion/styled";
import { body1, caption as captionTypography, h5, h6 } from "../../style/text";
import { css } from "@emotion/react";
import useSanityImageUrl from "./useSanityImageUrl";
import CodeBlock from "./CodeBlock";

function BodyImage({ asset, alt, caption }: PropsWithChildren<{
  asset: Image & { _type: "image" },
  alt?: string,
  caption?: any
}>) {
  const imageUrl = useSanityImageUrl(asset)

  const captionComponents = useMemo(() => ({
    block: {
      normal: ({ children }: any) =>
        <span css={captionTypography} children={children}/>
    }
  }), [])

  return (
    <figure css={css`width: 100%; margin: 40px 0;`}>
      <img src={imageUrl} alt={alt} css={css`width: 100%`}/>
      <figcaption>
        <PortableText value={caption} components={captionComponents}/>
      </figcaption>
    </figure>
  )
}

type Props = {
  className?: string;
  content: (Block | (Image & { _type: "image" }))[]
}

// TODO: Better name
function Body({ content, className }: Props) {
  const components = useMemo(() => ({
    block: {
      h1: ({ children }: any) => <Heading4 children={children}/>,
      h2: ({ children }: any) => <Heading5 children={children}/>,
      h3: ({ children }: any) => <Heading6 children={children}/>,
      normal: ({ children }: any) => <Normal children={children}/>,
    },
    marks: {
      link: ({ value, children }: any) =>
        <a css={css`text-decoration: underline`} href={value?.href}>{children}</a>,
      code: ({ children }: any) => <code css={css`background: #eee`}>{children}</code>
    },
    types: {
      captionedImage: ({ value }: any) => (
        <BodyImage asset={value} caption={value.caption} alt={value.alt}/>
      ),
      codeBlock: ({ value }: any) => (
        <CodeBlock language={value.language} code={value.code} />
      )
    },
    listItem: {
      bullet: ({ children }: any) => <ListItem>{children}</ListItem>,
      number: ({ children }: any) => <ListItem>{children}</ListItem>
    }
  }), [])

  return (
    <div css={css`max-width: 680px;`} className={className}>
      <PortableText value={content} components={components}/>
    </div>
  )
}

const Heading4 = styled.h4`
  ${h5};
  margin: 0;
  font-weight: bold;
  
  &:not(:first-child) {
    margin-top: 56px;  
  }
  
`
const Heading5 = styled.h5`
  ${h6};
  margin: 0;
  margin-top: 40px;
  font-weight: bold;
`
const Heading6 = styled.h6`
  ${body1};
  font-weight: bold;
  margin: 0;
  margin-top: 24px;
`

const Normal = styled.p`
  ${body1};
  margin: 8px 0 16px 0;
`

const ListItem = styled.li`
  ${body1};
  margin-bottom: 12px;
`

export default Body