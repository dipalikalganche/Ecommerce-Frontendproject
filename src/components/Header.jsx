import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={styles.header}>
      <h2>Fashion Store 👗</h2>

      <nav>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "#667eea",
    color: "white"
  },
  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none"
  }
};

export default Header;
