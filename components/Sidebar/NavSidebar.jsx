import React, { useEffect, useState } from "react";
import { colors } from "../../theme";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import NavItem from "./NavItem";
//mui
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { menuItems } from "@/data/menuData";


function NavSidebar() {
  const { collapseSidebar } = useProSidebar();
  const [selected, setSelected] = useState();
  const router = useRouter();

  const isActive = (pathname) => {
    return router.pathname === pathname;
  };

  useEffect(() => {
    // Check if the current pathname is a submenu item and expand the submenu if necessary
    const submenuItem = menuItems.find((menuItem, index) =>
      menuItem.submenu
        ? menuItem.submenu.some((item) => isActive(item.to))
        : false
    );

    if (submenuItem) {
      setSelected(menuItems.indexOf(submenuItem));
    }
  }, [router.pathname]);

  return (
    <>
      <Box
        sx={{
          "& .css-1wvake5": {
            borderColor: `#1F2A40!important`,
          },
          "& .ps-sidebar-root": {
            height: `100% !important`,
            minHeight: `100vh !important`,
          },
          "& .ps-sidebar-container": {
            background: `#1F2A40!important`,
          },
          "& .ps-menu-icon": {
            backgroundColor: "transparent !important",
          },
          "& .ps-menu-button": {
            padding: "5px 35px 5px 20px !important",
          },
          "& .ps-menu-button:hover": {
            backgroundColor: "transparent !important",
            color: "#868dfb !important",
          },

          "& .ps-submenu-content": {
            background: `#1F2A40!important`,
            paddingLeft: "20px",
            color: "#868dfb !important",
          },
        }}
      >
        <Sidebar>
          <Menu iconShape="square">
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => collapseSidebar()}
              icon={<MenuOutlinedIcon />}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
              </Box>
            </MenuItem>
            {/* MAIN MENU ITEMS */}
            {menuItems.map((item, index) => {
              if (item.submenu) {
                return (
                  <SubMenu
                    key={index}
                    label={item.title}
                    icon={item.icon}
                    style={{ color: colors.grey[100] }}
                    onToggle={() => setSelected(index)}
                    defaultOpen={
                      selected === index ||
                      (item.submenu &&
                        item.submenu.some((subitem) => isActive(subitem.to)))
                    }
                  >
                    {item.submenu.map((subitem, subindex) => (
                      <NavItem
                        key={subindex}
                        title={subitem.title}
                        icon={subitem.icon}
                        to={subitem.to}
                        isActive={isActive(subitem.to)}
                      />
                    ))}
                  </SubMenu>
                );
              } else {
                return (
                  <NavItem
                    key={index}
                    title={item.title}
                    to={item.to}
                    icon={item.icon}
                    isActive={isActive(item.to)}
                  ></NavItem>
                );
              }
            })}
          </Menu>
        </Sidebar>
      </Box>
    </>
  );
}

export default NavSidebar;
