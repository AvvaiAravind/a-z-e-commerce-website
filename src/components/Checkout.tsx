import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import FormComponent from "./FormComponent";
import Summary from "./Summary";

const Checkout = () => {
  const { totalItems, totalPrice, itemsInCart } = useContext(DataContext);
  const captions = ["NAME", "PRICE", "QTY", "TOTAL"];

  return (
    <main className="flex-grow">
      {itemsInCart.length > 0 ? (
        <div className="w-[90%] md:w-[80%] mx-auto">
          <div className="flex justify-between font-bold py-2 border-b-2 border-black">
            {captions.map((c) => (
              <p key={c} className="font-bold">
                {c}
              </p>
            ))}
          </div>
          {itemsInCart.map((item) => (
            <Summary key={item.id} item={item} />
          ))}
          <div className="flex justify-between border-t-2 border-black py-2 mt-4">
            <p className="col-span-2"></p>
            <p className="text-right">
              <span className="hidden md:inline">Total Quantity = </span>
              {totalItems}
            </p>
            <p className="text-right">
              <span className="hidden md:inline">Total Price = </span>
              {totalPrice}
            </p>
          </div>

          <FormComponent itemsInCart={itemsInCart} />
        </div>
      ) : (
        <p className="text-center">Nothing Added in the Cart</p>
      )}
    </main>
  );
};

export default Checkout;
