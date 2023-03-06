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
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";
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
      <nav>
        <MuiAppBar color="inherit" elevation={isScrolledDown ? 3 : 0} component="div">
          <Toolbar>
            <IconButton
              sx={{ mr: 1, display: { sm: "none" } }}
              edge="start"
              color="primary"
              children={<Icon path={mdiMenu} size={1} />}
              onClick={() => setIsDrawerOpen(true)}
            />
            <div className="flex grow">
              <Link to="/">
                <h1 aria-label="John Gachihi">
                  <img src={Logo} alt="John Gachihi" width={143} aria-hidden />
                </h1>
              </Link>
            </div>

            <LinkList>
              <li>
                <NavLink to="/articles">Articles</NavLink>
              </li>
              <li>
                <NavLink to="/projects">Projects</NavLink>
              </li>
              <li>
                <NavLink to="/contacts">Contacts</NavLink>
              </li>
            </LinkList>
          </Toolbar>
        </MuiAppBar>
        <Toolbar /> {/*Offset the content below top-app-bar*/}
      </nav>

      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <List sx={{ width: 250 }}>
          <ListItem disablePadding onClick={() => setIsDrawerOpen(false)}>
            <DrawerLink to="/articles">Articles</DrawerLink>
          </ListItem>

          <ListItem disablePadding onClick={() => setIsDrawerOpen(false)}>
            <DrawerLink to="/projects">Projects</DrawerLink>
          </ListItem>

          <ListItem disablePadding onClick={() => setIsDrawerOpen(false)}>
            <DrawerLink to="/contacts">Contacts</DrawerLink>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

const LinkList = styled.ul`
  display: flex;
  @media (max-width: 600px) {
    display: none;
  }
  & > li > a {
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
