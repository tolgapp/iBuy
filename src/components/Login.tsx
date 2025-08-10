import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/reducers/authReducer";
import { formButton, inputClass, labelClass, signUpAndLoginContainerClass } from "../utils/helper";

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
    <div className="flex flex-col sm:flex-row bg-white min-h-screen">
      <div className="sm:flex-1 flex items-center justify-center h-[20rem] sm:min-h-screen">
        <h2 className="text-5xl sm:text-7xl font-bold">Welcome back!</h2>
      </div>
      <div className={`${signUpAndLoginContainerClass} bg-black sm:flex-1 pt-10 pb-20`}>
        <form onSubmit={handleSubmit} className="flex flex-col px-8">
          <label htmlFor="email" className={labelClass}>
            Email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
          <label htmlFor="password" className={labelClass}>
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />
          <button className={formButton} type="submit">
            Login
          </button>
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
          <div className="mt-2 flex justify-between">
            <p className="text-white text-lg font-medium">
              New @iBuy? Sign up and save.
            </p>
            <Link className="text-[#007bff] font-medium text-lg" to={"/signup"}>
              Registration
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
