import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ padding: "30px" }}>
      {/* ⭐ HEADER SECTION */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h1>🛍️ Fashion Store</h1>
          <p>Welcome to our ecommerce clothing store</p>
        </div>

        {/* ADD PRODUCT BUTTON */}
        <button
          onClick={() => navigate("/create-product")}
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add Product
        </button>
      </div>

      <ProductList />
    </div>
  );
}

export default Home;
