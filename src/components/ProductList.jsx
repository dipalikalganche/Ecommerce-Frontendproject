import { useEffect, useState } from "react";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const dispatch = useDispatch();

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

  const filteredProducts = products.filter((product) => {
    if (categoryFilter === "") return true;
    return product.category?.toLowerCase() === categoryFilter.toLowerCase();
  });

  const getImageSrc = (image) => {
    if (!image) return null;
    if (typeof image === "string" && image.trim() !== "") return image;

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
      {/* --- HEADER SECTION --- */}
      <div style={styles.header}>
        <div style={styles.spacer}></div>
        <h2 style={styles.title}>Our Products</h2>
        <div style={styles.filterWrapper}>
          <label style={styles.filterLabel}>Filter By Category:</label>
          <select
            style={styles.select}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="shirt">Shirt</option>
            <option value="t-shirt">T-Shirt</option>
            <option value="kurti">Kurti</option>
            <option value="hoodie">Hoodie</option>
            <option value="pant">Pant</option>
            <option value="jeans">Jeans</option>
            <option value="shorts">Shorts</option>
            <option value="skirt">Skirt</option>
            <option value="jacket">Jacket</option>
            <option value="dress">Dress</option>
          </select>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div style={styles.grid}>
        {filteredProducts.map((product) => {
          const imageSrc = getImageSrc(product.image);

          return (
            <div key={product._id} style={styles.card}>
              <div style={styles.contentWrapper}>
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

                <h3 style={styles.productName}>{product.name}</h3>
                <p style={styles.brand}>{product.brand}</p>
                <p style={styles.categoryTag}>{product.category}</p>
                <p style={styles.desc}>{product.description}</p>

                <div style={styles.priceRow}>
                  <span style={styles.price}>₹{product.price}</span>
                  <span>⭐ {product.rating}</span>
                </div>

                <p style={styles.infoText}>
                  <b>Size:</b> {product.size?.join(", ") || "N/A"}
                </p>
                <p style={styles.infoText}>
                  <b>Stock:</b> {product.stock}
                </p>
              </div>

              {/* BUTTON ALWAYS PINNED TO BOTTOM */}
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

      {filteredProducts.length === 0 && (
        <div style={styles.emptyMessage}>
          No products found for this category.
        </div>
      )}
    </div>
  );
}

export default ProductList;

/* ---------- STYLES ---------- */

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  spacer: { width: "300px" },
  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  filterWrapper: {
    width: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  filterLabel: { fontWeight: "600", marginRight: "10px", fontSize: "14px" },
  select: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
  },

  card: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    background: "#fff",
    textAlign: "center",
    // FLEXBOX LOGIC FOR ALIGNMENT
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%", // Ensures all cards in a row have equal height
  },

  contentWrapper: {
    flex: 1, // This pushes everything above the button to take available space
    display: "flex",
    flexDirection: "column",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "15px",
    background: "#f5f5f5",
  },
  noImage: {
    width: "100%",
    height: "200px",
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
  productName: { fontSize: "18px", margin: "10px 0 5px 0" },
  brand: { color: "#888", fontSize: "13px", marginBottom: "2px" },
  categoryTag: {
    fontSize: "12px",
    color: "#007bff",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  desc: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
    lineHeight: "1.4",
  },
  infoText: { fontSize: "14px", margin: "2px 0" },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0",
    alignItems: "center",
  },
  price: { fontWeight: "bold", fontSize: "20px", color: "#333" },
  select: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    cursor: "pointer",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
    appearance: "none", // Removes default OS styling
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "16px",
    paddingRight: "40px", // Space for the custom arrow
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    background: "#000",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px", // Spacing from the text above
    fontWeight: "600",
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: "50px",
    color: "#999",
    fontSize: "18px",
  },
};
