import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import GetNavigation from "./GetNavigation";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { user } = useAuth();

  const NAVIGATION = GetNavigation(user);

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
