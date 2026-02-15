import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);

  // total quantity count
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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

        {/* ⭐ CART ICON */}
        <Link to="/cart" style={styles.cart}>
          🛒 Cart ({cartItems?.length})
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

  logo: { margin: 0 },

  link: {
    marginLeft: "20px",
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },

  cart: {
    marginLeft: "20px",
    background: "white",
    color: "#667eea",
    padding: "5px 12px",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Header;
