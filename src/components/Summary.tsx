import { GadgetsType } from "../context/DataContext";

type SummaryProps = {
  item: GadgetsType;
};

const Summary = ({ item }: SummaryProps) => {
  return (
    <section className="flex justify-evenly items-center space-x-2 px-4 my-4">
      {}
      <p
        className="w-10 xs:whitespace-nowrap xs:overflow-hidden xs:text-ellipsis xs:max-w-[4ch] "
        title={item.name}
      >
        {item.name}
      </p>
      <p className="w-10 text-right ">{item.price}</p>
      <p className="w-10 text-right">{item.quantity}</p>
      <p className="w-10 text-right">{item.price * item.quantity}</p>
    </section>
  );
};

export default Summary;
