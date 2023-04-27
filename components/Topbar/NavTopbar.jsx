import { Box, Button, IconButton, useTheme } from "@mui/material";
import { colors } from "../../theme";
import InputBase from "@mui/material/InputBase";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { unsetToken } from "@/lib/auth";

function NavTopbar() {
  const logout = () => {
    unsetToken();
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        p={2}
        backgroundColor={colors.primary[500]}
      >
        {/* SEARCH BAR */}
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase
            sx={{ ml: 2, flex: 1, color: colors.white[500] }}
            placeholder="Search"
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon style={{ color: colors.white[500] }} />
          </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex">
          <IconButton>
            <NotificationsOutlinedIcon style={{ color: colors.white[500] }} />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon style={{ color: colors.white[500] }} />
          </IconButton>
          <IconButton onClick={logout}>
            <PersonOutlinedIcon style={{ color: colors.white[500] }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}

export default NavTopbar;
