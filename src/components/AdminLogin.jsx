import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password }
      );
      localStorage.setItem("adminToken", res.data.token);
      alert("Login Success");
      navigate("/admin/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={login} style={styles.form}>
      <h2>Admin Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button>Login</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: 300,
    margin: "40px auto",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};

export default AdminLogin;