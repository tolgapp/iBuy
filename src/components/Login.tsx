import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importiere useNavigate
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type LoginFormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  
  const navigate = useNavigate(); // Initialisiere useNavigate

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
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (response.ok) {

        notify('Login successful!');
        setFormData({
          email: "",
          password: "",
        });
      } else {
        notify('Invalid credentials');
      }
      
    } catch (error) {
      console.log(error);
      notify('Network error');
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
    <div className="login">
      <div className="text-container-login">
        <h2>Login to your account</h2>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="email">
            Email:
          </label>
          <input type="email" name="email" id="email" onChange={handleChange} />
          <label htmlFor="password" className="password">
            Password:
          </label>
          <input type="password" name="password" id="password" onChange={handleChange} />
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
        </form>
      </div>
    </div>
  );
};

export default Login;
