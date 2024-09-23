import "../style/Amount.css"

type AmountProps = {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

const Amount: React.FC<AmountProps> = ({amount, setAmount}) => {


  const increaseAmount = () => {
    setAmount((prevAmount) => prevAmount + 1);
  };

  const decreaseAmount = () => {
    setAmount((prevAmount) => (prevAmount > 0 ? prevAmount - 1 : prevAmount));
  };

  return (
    <div className="amount-calculator">
      <button className="increase" onClick={increaseAmount}>+</button>
      <h3>{amount}</h3>
      <button className="decrease" onClick={decreaseAmount}>-</button>
    </div>
  );
};

export default Amount;
