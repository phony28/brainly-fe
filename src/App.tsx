import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";

function RequireAuth({ children }: { children: React.ReactNode }) {
  return localStorage.getItem("token") ? children : <Navigate to="/signin" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
