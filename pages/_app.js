import "@/styles/globals.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useCustomeTheme } from "../theme";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
export default function App({ Component, pageProps }) {
  const theme = useCustomeTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <ProSidebarProvider>
          <Component {...pageProps} />
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}
