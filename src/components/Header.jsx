import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.header}>
      <h3>Warping Daily Report</h3>
      <button onClick={() => navigate("/admin/login")}>
        Admin Login
      </button>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#222",
    color: "#fff",
  },
};

export default Header;