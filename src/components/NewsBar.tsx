import { NewsBarProps } from "../types";

const NewsBar: React.FC<NewsBarProps> = ({ handleClick }) => {
  return (
    <div className="relative flex justify-center w-full items-center p-2.5 px-5 bg-[#ff793b] ">
      <h3 className="text-black font-medium text-center grow">
        Special offers for members and free delivery for over 20€ orders! Sign
        up now!
      </h3>
      <button
        className="text-2xl ml-auto cursor-pointer text-white"
        onClick={handleClick}
      >
        x
      </button>
    </div>
  );
};
export default NewsBar;
