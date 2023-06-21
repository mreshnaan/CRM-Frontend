//import icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";

export const menuItems = [
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: <HomeOutlinedIcon />,
  },
  {
    title: "Customer Management",
    icon: <PeopleOutlinedIcon />,
    submenu: [
      {
        title: "Customers",
        icon: <PeopleOutlinedIcon />,
        to: "/customer",
      },
      {
        title: "Create",
        icon: <PeopleOutlinedIcon />,
        to: "/customer/create",
      },
    ],
  },
  {
    title: "Invoice Management",
    icon: <PeopleOutlinedIcon />,
    submenu: [
      {
        title: "Invoices",
        icon: <PeopleOutlinedIcon />,
        to: "/invoice",
      },
      {
        title: "Create",
        icon: <PeopleOutlinedIcon />,
        to: "/invoice/create",
      },
    ],
  },
  {
    title: "Saler Management",
    icon: <PeopleOutlinedIcon />,
    submenu: [
      {
        title: "Salers",
        icon: <PeopleOutlinedIcon />,
        to: "/saler",
      },
      {
        title: "Create",
        icon: <PeopleOutlinedIcon />,
        to: "/saler/create",
      },
    ],
  },
];
