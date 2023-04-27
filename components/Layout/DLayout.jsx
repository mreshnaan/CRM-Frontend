import React, { useEffect } from "react";
import Topbar from "../Topbar/NavTopbar";
import Sidebar from "../Sidebar/NavSidebar";
import { colors } from "@/theme";
import { UserProvider, useFetchUser } from "@/lib/Context/auth";
import { useRouter } from "next/router";

function DLayout({ children }) {
  const { user, loading } = useFetchUser();
  console.log("user : ", user);
  const history = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      history.replace("/");
    }
  }, [loading, user, history]);
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
