/** @jsxImportSource @emotion/react */
import { Link as RouterLink } from "react-router-dom";
import styled from "@emotion/styled";
import { body1, body2, caption, h6 } from "../../style/text";
import { css } from "@emotion/react";
import { Skeleton } from "@mui/material";

type Props = {
  title: string
  date: string
  tags: string[]
  slug: string
  className?: string
}

function PostListItem({ title, date, tags, slug, ...otherProps }: Props) {
  return (
    <Link to={slug} {...otherProps}>
      <Container>
        <StartedOn>{date}</StartedOn>

        <div>
          <Title>{title}</Title>

          {tags &&
            <div css={css`display: flex, flex-wrap: wrap`}>
              {tags.map(tag => (<Tag children={"#" + tag} key={tag}/>))}
            </div>
          }
        </div>
      </Container>
    </Link>
  )
}

function PostListItemLoading(props: { className?: string }) {
  return (
    <Container {...props}>
      <StartedOn children={<Skeleton width={75}/>} />

      <div style={{minWidth: "40%"}}>
        <Title children={<Skeleton width="100%"/>} />
        <Tags>
          <Tag children={<Skeleton width={60}/>}/>
          <Tag children={<Skeleton width={60}/>}/>
          <Tag children={<Skeleton width={60}/>}/>
        </Tags>
      </div>
    </Container>
  )
}

const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  display: block;
`

const Container = styled.div`
  @media (max-width: 600px) {
    padding: 16px;
    border: 1px solid #b7b7b7;
    border-radius: 7px;
  }
  
  @media (min-width: 600px) {
    display: flex;
    align-items: baseline;
  } 
`
const StartedOn = styled.span`
  ${caption};
  
  @media (min-width: 600px) {
    margin-right: 16px;
  }
  
  @media (min-width: 900px) {
    ${body2};
  }
`
const Title = styled.span`
  font-weight: 500;
  display: block;
  ${body1};
  
  @media (max-width: 600px) {
    margin-bottom: 8px;
  }
  
  @media (min-width: 900px) {
    ${h6};
  }
  
  &:hover {
    text-decoration: underline;
  }
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Tag = styled.span`
  margin-right: 8px;
  ${caption};
  
  @media (min-width: 900px) {
    ${body2};
  }
`

export { PostListItem as default, PostListItemLoading }