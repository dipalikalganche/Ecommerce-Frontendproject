import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";

function Home() {
  const navigate = useNavigate();

  // const products = [
  //   {
  //     id: 1,
  //     name: "Men T-Shirt",
  //     price: "₹599",
  //     img: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 2,
  //     name: "Women Dress",
  //     price: "₹1299",
  //     img: "https://via.placeholder.com/150",
  //   },
  //   {
  //     id: 3,
  //     name: "Jeans",
  //     price: "₹999",
  //     img: "https://via.placeholder.com/150",
  //   },
  // ];

  const products = [];
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
          <h1>🛍️ Clothing Store</h1>
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

      {/* PRODUCTS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {products.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <img src={item.img} width="150" alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
      <ProductList />
    </div>
  );
}

export default Home;
