import { useNavigate } from "react-router-dom";

// for mobile view

export const Item = () => {
  const navigate = useNavigate();

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </>
  );
};
