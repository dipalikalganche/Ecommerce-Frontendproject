import { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./CreateProduct.css"; // Import the CSS file

function CreateProduct() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [image, setImage] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    size: "",
    category: "",
    brand: "",
    stock: "",
  });

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Handle the size string to array conversion
      const formattedProduct = {
        ...product,
        size: product.size.split(",").map((s) => s.trim()),
      };

      Object.keys(formattedProduct).forEach((key) => {
        formData.append(key, formattedProduct[key]);
      });
      formData.append("image", image);

      await axios.post(
        "http://localhost:8000/api/v1/product/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setTimeout(() => navigate("/"), 3000);
      setMessage("Product added successfully ✅");
      setSeverity("success");
      setOpen(true);

      // Reset Form
      setProduct({
        name: "",
        description: "",
        price: "",
        rating: "",
        size: "",
        category: "",
        brand: "",
        stock: "",
      });
      setImage(null);
    } catch (error) {
      setMessage("Error creating product ❌");
      setSeverity("error");
      setOpen(true);
    }
  };

  return (
    <div className="create-product-container">
      <div className="create-product-card">
        <h2>Create New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              placeholder="Short Description"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="number"
              name="price"
              placeholder="Price ($)"
              value={product.price}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Qty"
              value={product.stock}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="shirt">category</option>
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
            <select
              name="size"
              value={product.size}
              onChange={handleChange}
              required
            >
              <option value="">Size</option>
              <option value="S">Small</option>
              <option value="M">Medium</option>
              <option value="L">Large</option>
              <option value="XL">Extra Large</option>
            </select>
          </div>

          <div className="form-row">
            <input
              type="text"
              name="brand"
              placeholder="Brand Name"
              value={product.brand}
              onChange={handleChange}
            />
            <input
              type="number"
              step="0.1"
              name="rating"
              placeholder="Rating (0-5)"
              value={product.rating}
              onChange={handleChange}
            />
          </div>

          <div className="file-input-container">
            <label>Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Product
          </button>
        </form>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CreateProduct;
