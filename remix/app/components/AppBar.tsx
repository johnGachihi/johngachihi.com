/** @jsxImportSource @emotion/react */
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { Link, NavLink } from "@remix-run/react";
import { css } from "@emotion/react";
import { body1, body2 } from "~/styles/text";
import { type PropsWithChildren, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import styled from "@emotion/styled";
import Logo from "../../public/images/logo.svg";

function DrawerLink({ to, children }: PropsWithChildren<{ to: string }>) {
  return (
    <NavLink to={to} className="w-full">
      {({ isActive }) => (
        <ListItemButton selected={isActive}>
          <ListItemText
            disableTypography
            css={css`
              ${body2};
              font-weight: bold;
            `}
          >
            {children}
          </ListItemText>
        </ListItemButton>
      )}
    </NavLink>
  );
}

export function AppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            children={<MenuIcon />}
            onClick={() => setIsDrawerOpen(true)}
          />
          <div className="flex grow">
            <Link to="/">
              <img src={Logo} alt="Logo" width={143} />
            </Link>
          </div>

          <Nav>
            <NavLink to="/articles">Articles</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/other">Others</NavLink>
          </Nav>
        </Toolbar>
      </MuiAppBar>
      <Toolbar /> {/*Offset the content below top-app-bar*/}
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding onClick={() => setIsDrawerOpen(false)}>
            <DrawerLink to="/articles">Articles</DrawerLink>
          </ListItem>

          <ListItem disablePadding onClick={() => setIsDrawerOpen(false)}>
            <DrawerLink to="/projects">Projects</DrawerLink>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

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
`;
