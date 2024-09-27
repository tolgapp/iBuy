import React, { useEffect, useState } from "react";

const ScreenSizeWarning: React.FC = () => {
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 320) {
        setIsScreenTooSmall(true);
      } else {
        setIsScreenTooSmall(false);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (isScreenTooSmall) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          zIndex: 1000,
          fontSize: "2.2rem",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        The device screen is too small for the best shopping experience. Please
        visit us on a larger screen with a width of over 370px.
      </div>
    );
  }
};

export default ScreenSizeWarning;
