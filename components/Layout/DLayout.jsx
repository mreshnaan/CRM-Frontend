import React from "react";
import Topbar from "../Topbar/NavTopbar";
import Sidebar from "../Sidebar/NavSidebar";
import { colors } from "@/theme";

function DLayout({ children }) {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Sidebar />
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          height: "100%",
          background: `${colors.primary[500]}`,
        }}
      >
        <Topbar />
        {children}
      </div>
    </div>
  );
}

export default DLayout;
