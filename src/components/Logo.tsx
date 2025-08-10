import { Link } from "react-router-dom";

type LogoProps = {
  variant?: "navbar" | "footer";
};

const Logo: React.FC<LogoProps> = ({ variant }) => {
  const baseClass = "font-bold cursor-pointer md:mb-0 flex-1";
  const footerClass = variant === "footer" ? "mb-12" : "";
  const sizeClass = variant === "navbar" ? "text-4xl" : "text-6xl";
  const colorClass = variant === "navbar" ? "text-black" : "text-white";
  const positionClass =
    variant === "navbar"
      ? "absolute left-1/2 transform -translate-x-1/2"
      : "";

  return (
    <h2
      className={`${baseClass} ${sizeClass} ${colorClass} ${positionClass} ${footerClass}`}
    >
      <Link to={"/"}>iBuy</Link>
    </h2>
  );
};

export default Logo;
