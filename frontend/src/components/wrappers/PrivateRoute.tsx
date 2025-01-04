import {useState, ReactNode} from 'react'
import { Navigate, useLocation } from "react-router-dom";
import { Sidebar } from "../common/Sidebar";


interface PrivateRouteProps {
    children: ReactNode; // Define children as ReactNode
  }
  const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="h-screen w-screen flex flex-row">
    <Sidebar
      className={`${
        sidebarExpanded
          ? "sm:min-w-[300px] md:min-w-[300px] w-auto shrink-0"
          : "sm:min-w-[25px] md:min-w-[25px] min-w-[50px] w-auto shrink-0"
      }`}
      sidebarExpanded={sidebarExpanded}
      setSidebarExpanded={setSidebarExpanded}
      activePage={useLocation().pathname}
    />
    <div className="flex-1 overflow-hidden">{children}</div>
  </div>
  )
}

export default PrivateRoute