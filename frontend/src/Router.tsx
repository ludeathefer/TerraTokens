import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/wrappers/PrivateRoute";
import LandDetail from "./pages/LandDetail";
import MarketPlace from "./pages/marketplace";
import Demo from "./pages/Demo";
import Landing from "./pages/Landing";
import TransactionHistory from "./pages/TransactionHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <PrivateRoute>
      <Landing />
      // <Dashboard />
      // <Login />
      // <Signup />
      // </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/land-detail/:tokenId",
    element: (
      <PrivateRoute>
        <LandDetail />
      </PrivateRoute>
    ),
  },
  {
    path: "/history/",
    element: (
      <PrivateRoute>
        <TransactionHistory />
      </PrivateRoute>
    ),
  },
  {
    path: "/marketplace",
    element: (
      <PrivateRoute>
        <MarketPlace />
      </PrivateRoute>
    ),
  },
]);
