import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function AddToCartButton({ product }) {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <button
      onClick={handleAdd}
      style={{
        padding: "10px 20px",
        background: "black",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      Add To Cart
    </button>
  );
}

export default AddToCartButton;
