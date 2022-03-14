import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import styled from "@emotion/styled"
import {Link} from "react-router-dom";
import { body1 } from "../style/text"

function AppBar() {
  return (
    <MuiAppBar color="inherit" elevation={0}>
      <Toolbar>
        <IconButton
          sx={{ mr: 1, display: { sm: "none" } }}
          edge="start"
          color="primary"
          children={<MenuIcon />}
        />
        <Title>John Gachihi</Title>

        <Nav>
          <Link to="#">Blog</Link>
          <Link to="#">Projects</Link>
          <Link to="#">Others</Link>
        </Nav>
      </Toolbar>
    </MuiAppBar>
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
  }
`

export default AppBar