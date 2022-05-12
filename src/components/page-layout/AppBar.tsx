/** @jsxImportSource @emotion/react */
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import MenuIcon from "@mui/icons-material/Menu"
import IconButton from "@mui/material/IconButton"
import styled from "@emotion/styled"
import { Link, LinkProps, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { body1, body2 } from "../../style/text"
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { css } from "@emotion/react";
import useScrollTrigger from "@mui/material/useScrollTrigger"

function DrawerLink({ to, children }: LinkProps) {
  const resolvedPath = useResolvedPath(to)
  const match = useMatch({ path: resolvedPath.pathname, end: false })

  return (
    <ListItemButton
      selected={Boolean(match)}
      component={NavLink}
      to={to}
    >
      <ListItemText disableTypography css={css`${body2}; font-weight: bold`}>
        {children}
      </ListItemText>
    </ListItemButton>
  )
}

function AppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const isScrolledDown = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <MuiAppBar color="inherit" elevation={isScrolledDown ? 3 : 0}>
        <Toolbar>
          <IconButton
            sx={{ mr: 1, display: { sm: "none" } }}
            edge="start"
            color="primary"
            children={<MenuIcon/>}
            onClick={() => setIsDrawerOpen(true)}
          />
          <Title>
            <Link to="/">John Gachihi</Link>
          </Title>

          <Nav>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/other">Others</NavLink>
          </Nav>
        </Toolbar>
      </MuiAppBar>
      <Toolbar/> {/*Offset the content below top-app-bar*/}

      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <List sx={{ width: 250 }}>
          <ListItem disablePadding onClick={() => setIsDrawerOpen(false)}>
            <DrawerLink to="/blog">Blog</DrawerLink>
          </ListItem>

          <ListItem disablePadding onClick={() => setIsDrawerOpen(false)}>
            <DrawerLink to="/projects">Projects</DrawerLink>
          </ListItem>
        </List>
      </Drawer>
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