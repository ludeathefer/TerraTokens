import {Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom"
import Login from "./login"
import Signup from "./signup"

function App() {

  return ( 
    <Router>
      <Routes>
        <Route path = "/" element={<Navigate to = "/Signup" />} />
        <Route path="/Signup" element ={<Signup />} />
        <Route path = "/Login" element ={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
