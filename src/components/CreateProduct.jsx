import { useState } from "react";
import axios from "axios";

function CreateProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    size: "",
    brand: "",
    stock: "",
  });

  const [image, setImage] = useState(null);

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

      // append text fields
      Object.keys(product).forEach((key) => {
        formData.append(key, product[key]);
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
      alert("Product created successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Error creating product ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <input
          type="number"
          name="rating"
          placeholder="Rating"
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="size"
          placeholder="Size (M,L,XL)"
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
        />
        <br />
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        <br />
        <br />

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;
