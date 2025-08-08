type AmountProps = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

const Amount: React.FC<AmountProps> = ({amount, setAmount}) => {

  const buttonStyle = "text-black border-[.1rem] bg-white text-lg px-6 py-4 cursor-pointer hover:bg-black hover:text-white"


  const increaseAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const decreaseAmount = () => {
    setAmount((prevAmount) => (prevAmount > 0 ? prevAmount - 1 : prevAmount));
  };

  return (
    <div className="flex justify-between items-center gap-2">
      <button className={buttonStyle} onClick={increaseAmount}>+</button>
      <h3 className="text-4xl">{amount}</h3>
      <button className={buttonStyle} onClick={decreaseAmount}>-</button>
    </div>
  );
};

export default Amount;
