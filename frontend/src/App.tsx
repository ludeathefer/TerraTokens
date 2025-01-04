import {Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Login from "./pages/login"
import Signup from "./pages/signup"
import MarketPlace from "./pages/marketplace"
function App() {

  return ( 
    <Router>
      <Routes>
        <Route path = "/" element={<Navigate to = "/landdetail" />} />
        <Route path="/Signup" element ={<Signup />} />
        <Route path = "/Login" element ={<Login />} />
        <Route path="/Marketplace" element={<MarketPlace />}/>
      </Routes>
    </Router>
  )
}

export default App
