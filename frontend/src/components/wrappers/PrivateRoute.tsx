import { useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "../common/Sidebar";
import { useStore } from "../../hooks/use-store";

interface PrivateRouteProps {
  children: ReactNode; // Define children as ReactNode
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const isAuthenticated = useStore.getState().isAuthenticated;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="h-screen w-screen flex flex-row  ">
      <Sidebar
        className={`${
          sidebarExpanded
            ? "sm:min-w-[250px] md:min-w-[250px] w-auto shrink-0"
            : "sm:min-w-[25px] md:min-w-[25px] min-w-[50px] w-auto shrink-0"
        }`}
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
        activePage={location.pathname}
      />
      <div className="flex-1 overflow-hidden bg-green-950/5">{children}</div>
    </div>
  );
};

export default PrivateRoute;
