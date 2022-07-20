import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "@remix-run/react";
import { emphaticLink } from "~/styles/link";
import logo from "../../public/images/logo.svg"
import logoWrapped from "../../public/images/logo-wrapped.svg"

export default function Index() {
  const isScreenWidthXs = useMediaQuery("(max-width: 599px)")

  return (
    <Root>
      <div>
        {isScreenWidthXs 
           ? <Logo src={logoWrapped} style={{ width: 264, height: "auto" }}/>
           : <Logo src={logo} style={{ width: 422 }}/>}

        <NavLink to="/articles">
          <Typography variant="h5">Articles</Typography>
          <ArrowForwardIcon/>
        </NavLink>

        <NavLink to="/projects">
          <Typography variant="h5">Projects</Typography>
          <ArrowForwardIcon/>
        </NavLink>

        <NavLink to="/other">
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
  
  @media (max-width: 599px) {
    padding-top: 48px;
    margin: 0 32px;
  }
  
  @media (min-width: 600px) {
    justify-content: center;
    align-items: center;
    padding-bottom: 56px;
  }
  
  @media (max-height: 400px) {
    height: 130vh;
  } 
`

const Logo = styled.img`
  margin-top: 8px;
  margin-bottom: 40px
`

const NavLink = styled(Link)`
  ${emphaticLink};
  margin-bottom: 32px;
  
  & > *:first-child {
    margin-right: 8px;
  }
`
