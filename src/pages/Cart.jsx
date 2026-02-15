import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/cartSlice";

function Cart() {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your cart is empty 🛒</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Shopping Cart</h2>

      {cartItems.map((item) => (
        <div key={item._id} style={styles.card}>
          <img
            src={item.image || "/no-image.png"}
            alt={item.name}
            style={styles.image}
          />

          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button onClick={() => dispatch(decreaseQty(item._id))}>−</button>

            <span style={{ margin: "0 10px" }}>{item.quantity}</span>

            <button onClick={() => dispatch(increaseQty(item._id))}>+</button>

            <br />

            <button
              onClick={() => dispatch(removeFromCart(item._id))}
              style={{ marginTop: "10px", color: "red" }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    gap: "20px",
    border: "1px solid #ddd",
    padding: "10px",
    marginBottom: "15px",
  },

  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
  },
};

export default Cart;
