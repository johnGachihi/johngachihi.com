import {Link as RouterLink} from "react-router-dom";
import styled from "@emotion/styled";
import { caption, body2, body1, h6 } from "../../style/text";

type Props = {
  title: string;
  startedOn: string;
  tags: string[];
  slug: string;
}

function ListItem({startedOn, title, tags, slug}: Props) {
  return (
    <Link to={slug}>
      <Container>
        <StartedOn>{startedOn}</StartedOn>

        <div>
          <Title>{title}</Title>

          <div>
            {tags.map(tag => (<Tag children={"#" + tag} key={tag}/>))}
          </div>
        </div>
      </Container>
    </Link>
  )
}

const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
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
const Tag = styled.span`
  margin-right: 8px;
  ${caption};
  
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

export default ListItem