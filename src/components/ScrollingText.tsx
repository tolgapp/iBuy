import "../style/ScrollingText.css";

type Scrolling = {
  text: string;
};

const ScrollingText: React.FC<Scrolling> = ({ text }) => {
  return (
    <div className="scrolling-text-container">
      <h3 className="scrolling-text">{text}</h3>
    </div>
  );
};

export default ScrollingText;
