import { Routes, Route } from "react-router-dom";
import EmployeeManagement from "./components/EmployeeManagement";
import Display from "./pages/Display";
import Add from "./components/Add";
import Edit from "./components/Edit";
import Delete from "./components/Delete";
import Header from "./components/Header";
import Home from "./pages/Home";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
