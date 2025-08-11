import payment from "../data/payment-methods.json";

const Payments = () => {
  return (
    <div className="mt-4 flex flex-col ">
      <h3 className="my-1.5 text-white sm:text-right text-lg">Payment methods</h3>
      <section className="flex gap-2  sm:justify-end">
        {payment.map((pay, index) => (
          <img
            key={index}
            className="w-10  payment-border"
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
