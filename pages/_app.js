import "@/styles/globals.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import { useCustomeTheme } from "../theme";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



export default function App({ Component, pageProps }) {
  const theme = useCustomeTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster position="top-center" reverseOrder={false} />
        <ProSidebarProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
          </LocalizationProvider>
        </ProSidebarProvider>
      </ThemeProvider>
    </>
  );
}
