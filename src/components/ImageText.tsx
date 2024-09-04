import "../style/ImageText.css";

type ImageTextProps = {
  text: string;
  url: string;
  reverse?: string;
};

const ImageText: React.FC<ImageTextProps> = ({
  text,
  url,
  reverse = false,
}) => {
  return (
    <div className="outter-container">
      <div className={`inner-container ${reverse ? "reverse" : ""}`}>
        <img src={url} alt={"random picsum image"} />
        <h2>{text}</h2>
      </div>
    </div>
  );
};
export default ImageText;
