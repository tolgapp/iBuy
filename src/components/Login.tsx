import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Login.css";
import { Link } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

type LoginProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
};

const Login: React.FC<LoginProps> = ({ setIsLoggedIn, setUserId }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userId", data.userId);
        setUserId(data.userId);
        setIsLoggedIn(true);
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
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn, setUserId]);

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
            // value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password" className="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            // value={formData.password}
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
          <Link to={"/signup"}>Registration</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
