import { Routes, Route } from "react-router-dom"
import AuthLayout from "./layouts/AuthLayout"
import Signup from "./pages/auth/Signup"
import Signin from "./pages/auth/Signin"
import ProtectedLayout from "./layouts/ProtectedLayout"
import Dashboard from "./pages/main/Dashboard"
import Profile from "./pages/main/Profile"
import Home from "./pages/main/Home"
import EditProfile from "./pages/main/EditProfile"

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />} >
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin />} />
      </Route>

      <Route path="/u/:username" element={<Profile />} />
      <Route path="/" element={<Home />} />

      <Route path="/" element={<ProtectedLayout />} >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="edit-profile" element={<EditProfile />} />
      </Route>
    </Routes>
  )
}
