/** @jsxImportSource @emotion/react */
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Link, NavLink } from "@remix-run/react";
import Logo from "../../public/images/logo.svg";
import clsx from "clsx";
import {
  Menu as ReachMenu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext
} from "@reach/menu-button";

export function AppBar() {
  return (
    <nav
      className="z-50 px-4 sm:px-6 flex justify-between items-center bg-surface border-b border-gray-200 min-h-14 sm:min-h-16 top-0 right-0 w-full bg-white">

      <Menu />

      <div className="flex grow">
        <Link to="/">
          <h1 aria-label="John Gachihi">
            <img src={Logo} alt="John Gachihi" width={143} aria-hidden />
          </h1>
        </Link>
      </div>

      <ul className="hidden sm:flex">
        {
          [
            { to: "/articles", label: "Articles" },
            { to: "/projects", label: "Projects" },
            { to: "/contacts", label: "Contacts" }
          ].map(({ to, label }) => (
            <li className="mr-6" key={label}>
              <NavLink
                to={to}
                className={({ isActive }) => isActive ? "underline font-bold" : "no-dec"}
              >{label}</NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

function Menu() {
  return (
    <ReachMenu>
      <MenuButton className="sm:hidden pr-4 rounded-full">
        <Icon path={mdiMenu} size={1} />
      </MenuButton>

      <Drawer />
    </ReachMenu>
  );
}

function Drawer() {
  const { isExpanded } = useMenuButtonContext();

  useEffect(() => {
    if (isExpanded) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add("fixed");
      document.body.classList.add("inset-0");
      document.body.classList.add("overflow-y-scroll");
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = "100vh";
    } else {
      document.body.classList.remove("fixed");
      document.body.classList.remove("inset-0");
      document.body.classList.remove("overflow-y-scroll");
      document.body.style.removeProperty("height");
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {isExpanded &&
        <MenuPopover
          position={() => ({
            top: "56px",
            left: 0,
            bottom: 0,
            right: 0
          })}
          style={{ display: "block" }}
          className="z-50"
        >
          <motion.aside
            className="w-[256px] fixed h-full bg-white z-50"
            initial={{ left: -256 }}
            animate={{ left: 0 }}
            exit={{ left: -256 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
          >
            <MenuItems className="border-none p-0 py-2">
              {
                [
                  { to: "/articles", label: "Articles" },
                  { to: "/projects", label: "Projects" },
                  { to: "/contacts", label: "Contacts" }
                ].map(({ to, label }) => (
                  <MenuLink as={NavLink} to={to} key={to} className={({ isActive }: {
                    isActive: boolean
                  }) => clsx("font-bold text-sm tracking-[0.25px] flex py-3 px-4", isActive && "bg-black/10")}>
                    {label}
                  </MenuLink>
                ))
              }
            </MenuItems>
          </motion.aside>

          <motion.div
            className="fixed w-full h-full bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
          />
        </MenuPopover>}
    </AnimatePresence>
  );
}
