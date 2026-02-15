import { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom"; // Don't forget this!
import "./CreateProduct.css";

function CreateProduct() {
  const navigate = useNavigate();
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

      // Convert size to array (handles dropdown string or manual input)
      const formattedSize = Array.isArray(product.size)
        ? product.size
        : product.size.split(",").map((s) => s.trim());

      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
      });

      formData.append("image", image);

      await axios.post(
        "http://localhost:8000/api/v1/product/create",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      // Redirect after success
      setTimeout(() => navigate("/"), 2000);
      setMessage("Product added successfully ✅");
      setSeverity("success");
      setOpen(true);
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
            <label className="input-label">Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. Premium Slim Fit Shirt"
              value={product.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">Description</label>
            <textarea
              name="description"
              placeholder="Tell customers about your product..."
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="input-label">Stock Qty</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Category</label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
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
            <div className="form-group">
              <label className="input-label">Main Size</label>
              <select
                name="size"
                value={product.size}
                onChange={handleChange}
                required
              >
                <option value="">Select Size</option>
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="input-label">Brand</label>
              <input
                type="text"
                name="brand"
                placeholder="Brand Name"
                value={product.brand}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="input-label">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                max="5"
                name="rating"
                value={product.rating}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="file-input-container">
            <label className="input-label">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Product to Store
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
