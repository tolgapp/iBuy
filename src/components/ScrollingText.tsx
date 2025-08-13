import { ScrollingProps } from "../types";


const ScrollingText: React.FC<ScrollingProps> = ({ text }) => {
  return (
    <div className="max-w-full overflow-hidden whitespace-nowrap h-20 bg-black items-center flex">
      <h3 className="scroll-text text-white text-5xl font-black  whitespace-nowrap pl-12">
        {text}
      </h3>
    </div>
  );
};

export default ScrollingText;
