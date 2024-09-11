import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

type FormData = {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
};

const Signup: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const notify = (message: string) => toast(message);

  // Check for valid Data to sign up
  const validateFormData = () => {
    if (!formData.email.includes("@")) {
      notify("Please enter a valid email address.");
      return false;
    }
    if (formData.password !== formData.verifyPassword) {
      notify("Passwords do not match!");
      return false;
    }
    return true;
  };

  // Prevents the form from making dumb moves and returns nothing if data from formData is not valid
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateFormData()) {
      return;
    }

    // Perform further actions if the form data is valid
  };

  // Updates the formData Object with the typed new Data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="signup">
      <div className="text-container-signup">
        <h2>Save products. Save money.</h2>
        <h3>Join us. It's free.</h3>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="name">
            Name:
          </label>
          <input type="text" name="name" id="name" onChange={handleChange} />
          <label htmlFor="email" className="email">
            Email:
          </label>
          <input type="email" name="email" id="email" onChange={handleChange} />
          <label htmlFor="password" className="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
          />
          <label htmlFor="verifyPassword" className="password">
            Verify password:
          </label>
          <input
            type="password"
            name="verifyPassword"
            id="verifyPassword"
            onChange={handleChange}
          />
          <button type="submit">Sign up</button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Signup;