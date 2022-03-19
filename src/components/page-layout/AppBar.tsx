import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import styled from "@emotion/styled"
import {NavLink} from "react-router-dom";
import {body1} from "../../style/text"

function AppBar() {
  return (
    <>
      <MuiAppBar color="inherit" elevation={0}>
        <Toolbar>
          <IconButton
            sx={{mr: 1, display: {sm: "none"}}}
            edge="start"
            color="primary"
            children={<MenuIcon/>}
          />
          <Title>John Gachihi</Title>

          <Nav>
            <NavLink to="/blogs">Blog</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/ble">Others</NavLink>
          </Nav>
        </Toolbar>
      </MuiAppBar>
      <Toolbar/>
    </>
  )
}

const Title = styled.span`
  flex-grow: 1;
  font-family: 'Caveat', cursive;
  font-size: 32px;
  color: black;
`

const Nav = styled.nav`
  @media (max-width: 600px) {
    display: none;
  }

  & > a {
     ${body1};
     text-decoration: none;
     color: inherit;
     margin-right: 24px;
     
     &.active {
      text-decoration: underline;
      font-weight: bold;
     }
  }
`

export default AppBar