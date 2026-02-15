import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // calculate total price
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item?.price * item?.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your cart is empty 🛒</h2>
        <p>Add some products to continue shopping</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Shopping Cart</h2>

      <div style={styles.layout}>
        {/* LEFT SIDE — PRODUCTS */}
        <div style={styles.itemsContainer}>
          {cartItems.map((item) => (
            <div key={item._id} style={styles.card}>
              <img
                src={item.image || "/no-image.png"}
                alt={item.name}
                style={styles.image}
              />

              <div style={styles.info}>
                <h3 style={styles.name}>{item.name}</h3>
                <p style={styles.brand}>{item.brand}</p>

                <p style={styles.price}>₹{item.price}</p>

                {/* quantity controls */}
                <div style={styles.qtyBox}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => dispatch(decreaseQty(item._id))}
                  >
                    −
                  </button>

                  <span style={styles.qty}>{item.quantity}</span>

                  <button
                    style={styles.qtyBtn}
                    onClick={() => dispatch(increaseQty(item._id))}
                  >
                    +
                  </button>
                </div>

                <p style={styles.subtotal}>
                  Subtotal: ₹{item.price * item.quantity}
                </p>

                <button
                  style={styles.removeBtn}
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE — TOTAL */}
        <div style={styles.summary}>
          <h3>Price Details</h3>

          <div style={styles.row}>
            <span>Total Items</span>
            <span>
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          </div>

          <div style={styles.row}>
            <span>Total Price</span>
            <span>₹{totalAmount}</span>
          </div>

          <hr />

          <div style={styles.totalRow}>
            <span>Total Payable</span>
            <span>₹{totalAmount}</span>
          </div>

          <button style={styles.orderBtn}>Order Now 🚀</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;

/* ---------- STYLES ---------- */

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1100px",
    margin: "auto",
    fontFamily: "Arial",
  },

  title: {
    marginBottom: "30px",
  },

  layout: {
    display: "flex",
    gap: "30px",
    alignItems: "flex-start",
  },

  itemsContainer: {
    flex: 2,
  },

  summary: {
    flex: 1,
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    background: "#fff",
    position: "sticky",
    top: "90px",
  },

  card: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  image: {
    width: "140px",
    height: "140px",
    objectFit: "contain",
    borderRadius: "10px",
    background: "#f5f5f5",
  },

  info: {
    flex: 1,
  },

  name: {
    margin: "0 0 5px 0",
  },

  brand: {
    color: "#777",
    fontSize: "14px",
  },

  price: {
    fontWeight: "bold",
    fontSize: "18px",
    margin: "10px 0",
  },

  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "10px 0",
  },

  qtyBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    cursor: "pointer",
    fontSize: "18px",
    background: "#fff",
  },

  qty: {
    fontWeight: "bold",
    fontSize: "16px",
  },

  subtotal: {
    fontSize: "14px",
    color: "#555",
  },

  removeBtn: {
    marginTop: "10px",
    background: "none",
    border: "none",
    color: "red",
    cursor: "pointer",
    fontWeight: "bold",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "12px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "18px",
    marginTop: "15px",
  },

  orderBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },

  empty: {
    textAlign: "center",
    marginTop: "100px",
  },
};
