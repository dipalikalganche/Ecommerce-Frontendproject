import { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function CreateProduct() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [severity, setSeverity] = useState("success"); // success | error
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    size: "", // will convert to array
    category: "",
    brand: "",
    stock: "",
  });
  const handleClose = () => {
    setOpen(false);
  };

  // handle text input
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // handle file input
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // convert size string -> array (M,L → ["M","L"])
      const formattedProduct = {
        ...product,
        size: product.size.split(",").map((s) => s.trim()),
      };

      // append text fields
      Object.keys(formattedProduct).forEach((key) => {
        formData.append(key, formattedProduct[key]);
      });

      // append image
      formData.append("image", image);

      const res = await axios.post(
        "http://localhost:8000/api/v1/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(res.data);
      setMessage("added successfully");
      setSeverity("success");
      setOpen(true);
    } catch (error) {
      console.log(error);
      alert("Error creating product ❌");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Product</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />

        <input
          style={styles.input}
          type="number"
          step="0.1"
          name="rating"
          placeholder="Rating (0-5)"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="text"
          name="size"
          placeholder="Size (M,L,XL)"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="text"
          name="category"
          placeholder="Category (clothing, shoes, etc)"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
        />

        <input
          style={styles.file}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button style={styles.button} type="submit">
          Create Product
        </button>
      </form>
      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "40px auto",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    fontFamily: "Arial",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  file: {
    border: "none",
  },

  button: {
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default CreateProduct;
