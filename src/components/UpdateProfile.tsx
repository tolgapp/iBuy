import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setLoggedOut } from "../store/reducers/authReducer";
import { formButton, inputClass, labelClass } from "../utils/helper";
import "react-toastify/dist/ReactToastify.css";
import { UpdateProfileFormProps } from "../types";

const UpdateProfileForm = () => {
  const { userId } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<UpdateProfileFormProps>({
    userId: userId || "",
    name: "",
    email: "",
    password: "",
  });

  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      toast.info("User ID is missing. Please log in again.");
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
        toast.info("User ID is missing. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${VITE_API_URL}/api/user/profile/${userId}`
        );
        const data = response.data;
        setFormData((prevData) => ({
          ...prevData,
          name: data.name,
          email: data.email,
        }));
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.info("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, [userId, navigate]);

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
      await axios.post(`${VITE_API_URL}/api/update-profile`, formData);
      toast.info("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.info("An error occurred while updating the profile.");
    }
  };

  const onLogout = () => {
    dispatch(setLoggedOut());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center min-h-screen">
      <div className="w-full sm:flex-1 flex items-center justify-center flex-col gap-8 h-[20rem] mt-10 sm:mt-0 mb-10 sm:mb-0 text-center sm:h-full">
        <h2 className="text-5xl font-semibold sm:text-7xl">
          We will miss you!
        </h2>
        <button
          onClick={onLogout}
          className="px-6 py-3 text-xl bg-black text-white cursor-pointer hover:bg-red-700"
        >
          Logout
        </button>
      </div>
      <div className="sm:flex-1 flex flex-col items-center justify-center bg-black min-h-screen p-6">
        <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
          <div>
            <label className={labelClass}>Update your name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Update your email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="password" className={labelClass}>
              Update your password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className={inputClass}
            />
          </div>
          <button type="submit" className={formButton}>
            Update profile
          </button>
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
