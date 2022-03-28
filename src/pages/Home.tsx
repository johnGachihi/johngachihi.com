import styled from "@emotion/styled";
import {Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {Link} from "react-router-dom"
import { emphaticLink } from "../style/link";

function Home() {
  return (
    <Root>
      <div>
        <Title>John Gachihi</Title>

        <NavLink to="#">
          <Typography variant="h5">Blog</Typography>
          <ArrowForwardIcon/>
        </NavLink>

        <NavLink to="/projects">
          <Typography variant="h5">Projects</Typography>
          <ArrowForwardIcon/>
        </NavLink>

        <NavLink to="#">
          <Typography variant="h5">Other</Typography>
          <ArrowForwardIcon/>
        </NavLink>
      </div>
    </Root>
  )
}

const Root = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
  
  @media (max-width: 900px) {
    padding-top: 48px;
    margin: 0 32px;
  }
  
  @media (min-width: 900px) {
    justify-content: center;
    align-items: center;
    padding-bottom: 56px;
  }
  
  @media (max-height: 400px) {
    height: 130vh;
  } 
`

const Title = styled.div`
  font-family: 'Caveat', cursive;
  font-size: 96px;
  line-height: 1.3;
  margin-bottom: 36px
`

const NavLink = styled(Link)`
  ${emphaticLink};
  margin-bottom: 32px;
  
  & > *:first-child {
    margin-right: 8px;
  }
`

export default Home