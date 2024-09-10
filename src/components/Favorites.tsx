import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
  verifyPassword: string;
};

const Favorites: React.FC = () => {

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    verifyPassword: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData(prev => ({
      ...prev,
    [name]: value
    }));
  };

  

  return (
    <div className="favorites">
      <div className="text-container-favorites">
        <h2>Save products. Save money.</h2>
        <h3>Join us. It's free.</h3>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="name">
            Name:
          </label>
          <input type="name" name="name" id="name" onChange={handleChange} />
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
        </form>
      </div>
    </div>
  );
};

export default Favorites;
