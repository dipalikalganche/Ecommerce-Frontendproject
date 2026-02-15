import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* --- BRAND SECTION --- */}
        <div style={styles.section}>
          <h3 style={styles.brandLogo}>Fashion Store 👗</h3>
          <p style={styles.text}>
            Elevate your style with our premium collection of curated fashion.
            Quality meets comfort in every stitch.
          </p>
        </div>

        {/* --- QUICK LINKS --- */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.list}>
            <li>
              <Link to="/" style={styles.footerLink}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/cart" style={styles.footerLink}>
                My Cart
              </Link>
            </li>
            <li>
              <Link to="/login" style={styles.footerLink}>
                Account
              </Link>
            </li>
          </ul>
        </div>

        {/* --- CUSTOMER CARE --- */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Customer Care</h4>
          <ul style={styles.list}>
            <li style={styles.text}>Help Center</li>
            <li style={styles.text}>Shipping Policy</li>
            <li style={styles.text}>Returns & Exchanges</li>
          </ul>
        </div>

        {/* --- NEWSLETTER --- */}
        <div style={styles.section}>
          <h4 style={styles.heading}>Stay Updated</h4>
          <div style={styles.newsletter}>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
            />
            <button style={styles.newsletterBtn}>Join</button>
          </div>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p style={styles.copyright}>
          © 2026 <b>Fashion Store</b> — Built with ❤️ for fashion lovers.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "#1a1a1a",
    color: "#ffffff",
    padding: "60px 40px 20px 40px",
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  section: {
    display: "flex",
    flexDirection: "column",
  },
  brandLogo: {
    fontSize: "22px",
    marginBottom: "15px",
    color: "#fff",
  },
  heading: {
    fontSize: "16px",
    marginBottom: "20px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "#667eea", // Matching your header color
  },
  text: {
    fontSize: "14px",
    color: "#bbb",
    lineHeight: "1.6",
    margin: "5px 0",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  footerLink: {
    color: "#bbb",
    textDecoration: "none",
    fontSize: "14px",
    display: "block",
    marginBottom: "10px",
    transition: "color 0.2s",
  },
  newsletter: {
    display: "flex",
    gap: "5px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: "14px",
  },
  newsletterBtn: {
    background: "#667eea",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "600",
  },
  bottomBar: {
    marginTop: "50px",
    borderTop: "1px solid #333",
    paddingTop: "20px",
    textAlign: "center",
  },
  copyright: {
    fontSize: "13px",
    color: "#777",
  },
};

export default Footer;
