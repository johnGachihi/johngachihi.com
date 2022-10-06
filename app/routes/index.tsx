import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from "@remix-run/react";
import { emphaticLink } from "~/styles/link";
import logo from "../../public/images/logo.svg"
import logoWrapped from "../../public/images/logo-wrapped.svg"

export default function Index() {
  return (
    <Root>
      <div>
        <h1 aria-label="John Gachihi">
          <picture>
            <source media="(max-width: 640px)" srcSet={logoWrapped}/>
            <img src={logo} alt="John Gachihi logo" className="mt-2 mb-10 w-[265px] sm:w-[422px]" aria-hidden />
          </picture>
        </h1>

        <NavLink to="/articles">
          <Typography variant="h5" component="span">Articles</Typography>
          <ArrowForwardIcon/>
        </NavLink>

        <NavLink to="/projects">
          <Typography variant="h5" component="span">Projects</Typography>
          <ArrowForwardIcon/>
        </NavLink>

        <NavLink to="/contacts">
          <Typography variant="h5" component="span">Contacts</Typography>
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
  
  @media (max-width: 639px) {
    padding-top: 48px;
    margin: 0 32px;
  }
  
  @media (min-width: 640px) {
    justify-content: center;
    align-items: center;
    padding-bottom: 56px;
  }
  
  @media (max-height: 400px) {
    height: 130vh;
  } 
`

const NavLink = styled(Link)`
  ${emphaticLink};
  margin-bottom: 32px;
  
  & > *:first-child {
    margin-right: 8px;
  }
`
