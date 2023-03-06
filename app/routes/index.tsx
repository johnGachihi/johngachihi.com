import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";
import Icon from '@mdi/react';
import { mdiArrowRight } from '@mdi/js';
import { Link } from "@remix-run/react";
import { emphaticLink } from "~/styles/link";
import logo from "../../public/images/logo.svg"
import logoWrapped from "../../public/images/logo-wrapped.svg"

export default function Index() {
  return (
    <Root>
      <div>
        <header>
          <h1 aria-label="John Gachihi">
            <picture>
              <source media="(max-width: 640px)" srcSet={logoWrapped}/>
              <img src={logo} alt="John Gachihi logo" className="mt-2 mb-10 w-[265px] h-[194px] sm:w-[422px] sm:h-[82px]" aria-hidden />
            </picture>
          </h1>
        </header>

        <NavLink to="/articles">
          <Typography variant="h5" component="span">Articles</Typography>
          <Icon path={mdiArrowRight} size={1} />
        </NavLink>

        <NavLink to="/projects">
          <Typography variant="h5" component="span">Projects</Typography>
          <Icon path={mdiArrowRight} size={1} />
        </NavLink>

        <NavLink to="/contacts">
          <Typography variant="h5" component="span">Contacts</Typography>
          <Icon path={mdiArrowRight} size={1} />
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
