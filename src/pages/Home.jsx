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

  return <ProductList />;
}

export default Home;
