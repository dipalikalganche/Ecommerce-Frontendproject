import { useEffect, useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  // fetch products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/product");

      setProducts(res.data.products);
    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  // convert buffer image → base64 (for MongoDB stored images)
  const getImageSrc = (image) => {
    if (!image) return "";

    // if URL image
    if (typeof image === "string") return image;

    // if buffer image from backend
    if (image?.data?.data) {
      const base64String = btoa(
        new Uint8Array(image.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          "",
        ),
      );

      return `data:${image.contentType};base64,${base64String}`;
    }

    return "";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Our Products</h2>

      <div style={styles.grid}>
        {products?.map((product) => (
          <div key={product._id} style={styles.card}>
            <img
              src={getImageSrc(product.image)}
              alt={product.name}
              style={styles.image}
            />

            <h3>{product.name}</h3>
            <p style={styles.brand}>{product.brand}</p>

            <p style={styles.desc}>{product.description}</p>

            <div style={styles.priceRow}>
              <span style={styles.price}>₹{product.price}</span>
              <span>⭐ {product.rating}</span>
            </div>

            <p>
              <b>Size:</b> {product.size.join(", ")}
            </p>

            <p>
              <b>Stock:</b> {product.stock}
            </p>

            <button style={styles.button}>Add to Cart 🛒</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },

  card: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    background: "#fff",
    transition: "0.3s",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px",
  },

  brand: {
    color: "#777",
    fontSize: "14px",
  },

  desc: {
    fontSize: "14px",
    color: "#555",
  },

  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
  },

  price: {
    fontWeight: "bold",
    fontSize: "18px",
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    background: "#000",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
};
