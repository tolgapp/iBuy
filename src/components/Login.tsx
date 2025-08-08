import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../style/Login.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/reducers/authReducer";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const notify = (message: string) => toast.info(message);

  const validateFormData = () => {
    if (!formData.email.includes("@")) {
      notify("Please enter a valid email!");
      return false;
    }
    if (formData.password.length === 0) {
      notify("Password is required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    try {
      const response = await axios.post(`${VITE_API_URL}/api/login`, formData);
      if (response) {
        const data = response.data;
        dispatch(setAuth(data))
        notify("Login successful!");
        setFormData({ email: "", password: "" });
      } else {
        notify("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      notify("Network error");
    }
  };

useEffect(() => {
  const storedUserId = localStorage.getItem("userId");
  if (storedUserId) {
    dispatch(setAuth({ userId: storedUserId }));
  }
}, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login">
      <div className="text-container-login">
        <h2>Welcome back!</h2>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
          <ToastContainer
            position="bottom-right"
            autoClose={3200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="redirect-registration-container">
            <p className="redirect-text">New @iBuy? Sign up and save.</p>
            <Link to={"/signup"}>Registration</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
