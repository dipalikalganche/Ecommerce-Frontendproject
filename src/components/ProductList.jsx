import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
function ProductList() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
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

  // convert buffer image → base64 OR return URL
  const getImageSrc = (image) => {
    if (!image) return null;

    // if URL image
    if (typeof image === "string" && image.trim() !== "") {
      return image;
    }

    // if MongoDB buffer image
    if (image?.data?.data?.length) {
      const base64String = btoa(
        new Uint8Array(image.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          "",
        ),
      );

      return `data:${image.contentType};base64,${base64String}`;
    }

    return null;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Our Products</h2>

      <div style={styles.grid}>
        {products.map((product) => {
          const imageSrc = getImageSrc(product.image);

          return (
            <div key={product._id} style={styles.card}>
              {/* IMAGE / FALLBACK */}
              {imageSrc ? (
                <>
                  <img
                    src={imageSrc}
                    alt={product.name}
                    style={styles.image}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />

                  <div style={{ ...styles.noImage, display: "none" }}>
                    Image not available
                  </div>
                </>
              ) : (
                <div style={styles.noImage}>Image not available</div>
              )}

              <h3>{product.name}</h3>
              <p style={styles.brand}>{product.brand}</p>

              <p style={styles.desc}>{product.description}</p>

              <div style={styles.priceRow}>
                <span style={styles.price}>₹{product.price}</span>
                <span>⭐ {product.rating}</span>
              </div>

              <p>
                <b>Size:</b> {product.size?.join(", ") || "N/A"}
              </p>

              <p>
                <b>Stock:</b> {product.stock}
              </p>

              {/* <button style={styles.button}>Add to Cart 🛒</button> */}
              <button
                style={styles.button}
                onClick={() =>
                  dispatch(
                    addToCart({
                      _id: product._id,
                      name: product.name,
                      price: product.price,
                      image: imageSrc,
                      brand: product.brand,
                    }),
                  )
                }
              >
                Add to Cart 🛒
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductList;

/* ---------- STYLES ---------- */

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: "30px",
  },

  // 4 cards per row
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
  },

  card: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    background: "#fff",
    textAlign: "center",
    transition: "0.3s",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "15px",
    background: "#f5f5f5",
  },

  noImage: {
    width: "100%",
    height: "220px",
    borderRadius: "10px",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
    color: "#888",
    fontSize: "14px",
    border: "1px dashed #ddd",
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
    fontWeight: "600",
  },
};
