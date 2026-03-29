import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
const NAVIGATION = [
  {
    segment: "",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "about",
    title: "About",
    icon: <ShoppingCartIcon />,
  },
];
function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const router = {
    pathname: location.pathname,
    navigate: (path) => navigate(path),
  };
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{
        title: "Compliance Analysis",
        logo: <></>,
      }}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

export default Layout;
