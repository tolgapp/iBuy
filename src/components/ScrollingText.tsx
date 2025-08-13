import { ScrollingProps } from "../types";


const ScrollingText: React.FC<ScrollingProps> = ({ text }) => {
  return (
    <div className="max-w-full overflow-hidden whitespace-nowrap h-14 sm:h-20 bg-black items-center flex">
      <h3 className="scroll-text text-white text-3xl sm:text-5xl font-black whitespace-nowrap pl-10 sm:pl-12">
        {text}
      </h3>
    </div>
  );
};

export default ScrollingText;
