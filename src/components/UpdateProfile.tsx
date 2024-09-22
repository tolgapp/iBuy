import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/UpdateProfile.css";

type FormData = {
  userId: string;
  name: string;
  email: string;
  password: string;
};

type UpdateProfileProps = {
  userId: string | null;
  onLogout: () => void;
};

const UpdateProfileForm: React.FC<UpdateProfileProps> = ({
  userId,
  onLogout,
}) => {
  const [formData, setFormData] = useState<FormData>({
    userId: userId || "",
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      toast.info("Benutzer-ID fehlt. Bitte melden Sie sich erneut an.");
      navigate("/login");
    } else {
      setFormData((prevData) => ({
        ...prevData,
        userId,
      }));
    }
  }, [userId, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        toast.info("Benutzer-ID fehlt. Bitte melden Sie sich erneut an.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/user/profile/${userId}`
        );

        if (response.ok) {
          const data = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            name: data.name,
            email: data.email,
          }));
        } else {
          const errorText = await response.text();
          notify(`Fehler: ${errorText}`);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten:", error);
        notify("Es gab ein Problem beim Abrufen der Benutzerdaten");
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const notify = (message: string) => toast.info(message);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        notify("Successfully updated!");
      } else {
        const errorText = await response.text();
        notify(`Fehler: ${errorText}`);
      }
    } catch (error) {
      console.error(error);
      notify("Es gab ein Problem beim Senden der Anfrage");
    }
  };

  return (
    <div className="update-profile">
      <div className="logout-container">
        <h2>We will miss you!</h2>
        <button onClick={onLogout} className="logout">
          Logout
        </button>
      </div>
      <div className="update-container">
        <h2>Account Management</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Update your name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Update your email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password"> Update your password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update profile</button>
        </form>
        <ToastContainer
          position="bottom-right"
          autoClose={2300}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default UpdateProfileForm;
