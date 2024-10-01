import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/RenderInfo.css"

const RenderInfo = () => {
  const { pathname } = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupDismissed = sessionStorage.getItem("popupDismissed");

    if (!popupDismissed) {
      if (
        pathname === "/favorites" ||
        pathname === "/signup" ||
        pathname === "/login" ||
        pathname === "/update-profile"
      ) {
        setShowPopup(true);
      }
    }
  }, [pathname]);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem("popupDismissed", "true");
  };

  if (!showPopup) {
    return null; 
  }

  return (
    <div className="render-info-popup">
      <div className="popup-content">
        <button className="info-close-button" onClick={handleClose}>X</button>
        <h2>Welcome!</h2>
        <h3>
          Please note: The backend is hosted on Render.com, and their free tier
          automatically spins down when idle.
        </h3>
        <h4>
          It may take a few moments to spin back up after you sign up or log in. Thank you for your patience!
        </h4>
        <img src="/images/render.png" alt="Render.com Free Tier Information" />
      </div>
    </div>
  );
};

export default RenderInfo;
