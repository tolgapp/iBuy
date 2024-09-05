import payment from "../data/payment-methods.json";
import "../style/Payments.css";

const Payments = () => {
  return (
    <div className="payments">
      <h3>Payment methods</h3>
      <section className="payment-icons">
        {payment.map((pay) => (
          <img
            src={pay.svg}
            alt={pay.alt}
            title={pay.alt.replace("Logo", "")}
          />
        ))}
      </section>
    </div>
  );
};
export default Payments;
