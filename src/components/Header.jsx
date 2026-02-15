import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>Fashion Store 👗</h2>

      <nav>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "15px 40px",
    background: "#667eea",
    color: "white",

    position: "sticky", // ⭐ makes header stick on scroll
    top: 0, // ⭐ stick to top
    zIndex: 1000, // ⭐ keep above other content
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  logo: {
    margin: 0,
  },

  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
};

export default Header;
