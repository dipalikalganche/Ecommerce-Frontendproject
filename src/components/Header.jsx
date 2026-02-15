import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);

  // total quantity count (using this for the badge is more accurate than .length)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header style={styles.header}>
      {/* ⭐ LOGO REDIRECTS TO HOME */}
      <Link to="/" style={styles.logoLink}>
        <h2 style={styles.logo}>Fashion Store 👗</h2>
      </Link>

      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/register" style={styles.link}>
          Register
        </Link>

        {/* ⭐ CART ICON */}
        <Link to="/cart" style={styles.cart}>
          🛒 Cart ({totalItems})
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
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  // Style to ensure the logo doesn't look like a blue link
  logoLink: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
  },

  logo: {
    margin: 0,
    fontSize: "24px",
    cursor: "pointer",
  },

  nav: {
    display: "flex",
    alignItems: "center",
  },

  link: {
    marginLeft: "25px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
    transition: "opacity 0.2s",
  },

  cart: {
    marginLeft: "25px",
    background: "white",
    color: "#667eea",
    padding: "8px 16px",
    borderRadius: "20px", // Rounded pill shape looks more modern
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "transform 0.2s ease",
  },
};

export default Header;
