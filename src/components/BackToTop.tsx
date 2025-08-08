import { useState, useEffect } from "react";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="
          fixed bottom-4 right-4 z-[1000]
          bg-black text-white
          p-2 md:p-2.5
          cursor-pointer
          text-[1.6rem]
          opacity-70 hover:opacity-100
          transition-opacity duration-300 ease-in
          flex items-center rounded-lg justify-center
          w-8 h-8 sm:w-8 sm:h-8
          [@media(min-width:360px)]:[@media(max-width:505px)]:[@media(orientation:portrait)]:w-8
          [@media(min-width:360px)]:[@media(max-width:505px)]:[@media(orientation:portrait)]:h-8
          [@media(min-width:360px)]:[@media(max-width:505px)]:p-0
        "
        >
          <img
            src="/images/icons/arrow-left.png"
            alt="arrow top icon"
            className="
            rotate-90
            w-[1.2rem] h-auto
            [@media(min-width:360px)]:[@media(max-width:505px)]:[@media(orientation:portrait)]:w-[0.9rem]
          "
          />
        </button>
      )}
    </>
  );
};

export default BackToTop;
