import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // snackbar state
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success"); // success | error

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
      );

      console.log("res", res);

      if (res?.data?.message === "Login success") {
        setMessage("You have successfully logged in 🎉");
        setSeverity("success");
        setOpen(true);

        setTimeout(() => navigate("/"), 3000);
      } else {
        setMessage("Login failed ❌");
        setSeverity("error");
        setOpen(true);
      }
    } catch (error) {
      console.log("FULL ERROR 👉", error);
      console.log("ERROR RESPONSE 👉", error.response);

      if (error?.response?.data?.message === "Invalid password") {
        setMessage("Please enter valid password");
        setSeverity("error");
        setOpen(true);
      } else {
        setMessage(error.response?.data?.message || "Something went wrong");
        setSeverity("error");
        setOpen(true);
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Dress Better. Feel Better ✨</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p>
          New user? <Link to="/register">Register</Link>
        </p>
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

export default Login;
