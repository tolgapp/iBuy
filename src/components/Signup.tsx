import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  formButton,
  inputClass,
  labelClass,
  signUpAndLoginContainerClass,
} from "../utils/helper";

type FormData = {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
};

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const notify = (message: string) => toast.info(message);

  const validateFormData = () => {
    if (formData.name?.length < 2) {
      notify("Name is required for signup!");
      return false;
    }
    if (!formData.email.includes("@")) {
      notify("Please enter a valid email!");
      return false;
    }
    if (formData.password.length === 0) {
      notify("Password is required!");
      return false;
    }
    if (formData.password !== formData.verifyPassword) {
      notify("Passwords do not match!");
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
      const response = await fetch(`${VITE_API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
          verifyPassword: "",
        });
        notify("Registrierung erfolgreich!");
        setTimeout(() => {
          navigate("/login");
        }, 2800);
      } else if (response.status === 400) {
        notify("User already exists");
      } else {
        notify("Fehler bei der Registrierung");
      }
    } catch (error) {
      console.log(error);
      notify("Netzwerkfehler");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={` ${signUpAndLoginContainerClass} flex-col sm:flex-row`}>
      <div className="h-96 sm:flex-1 flex items-center justify-center flex-col sm:min-h-screen text-center">
        <h2 className="text-6xl font-bold">Save products.</h2>
        <h2 className="text-6xl font-bold">Save money. </h2>
        <h3 className="text-4xl font-medium">Join us. It's free.</h3>
      </div>
      <div className="bg-black w-full sm:flex-1 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center mx-auto text-left bg-black h-svh"
        >
          <label htmlFor="name" className={labelClass}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass}
          />
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
          <label htmlFor="verifyPassword" className={labelClass}>
            Verify password:
          </label>
          <input
            type="password"
            name="verifyPassword"
            id="verifyPassword"
            value={formData.verifyPassword}
            onChange={handleChange}
            className={inputClass}
          />
          <button type="submit" className={formButton}>
            Sign up
          </button>
          <ToastContainer
            position="bottom-right"
            autoClose={2700}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <div className="text-white">
            <p className="text-xl">Already have an account? Log in here. </p>
            <Link
              to={"/login"}
              className="text-xl text-[#007bff] font-semibold"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
