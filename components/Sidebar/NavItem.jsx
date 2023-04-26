import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { colors } from "../../theme";

function NavItem({ title, to, icon, isActive }) {
  return (
    <MenuItem
      title={title}
      href={to}
      icon={icon}
      style={{
        color: isActive ? "#6870fa" : colors.grey[100],
      }}
    >
      {title}
    </MenuItem>
  );
}

export default NavItem;
