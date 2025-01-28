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
        <>
          <div className="grid grid-cols-4 gap-2 my-4 text-center">
            {captions.map((c) => (
              <p key={c} className="font-bold">
                {c}
              </p>
            ))}
          </div>
          {itemsInCart.map((item) => (
            <Summary key={item.id} item={item} />
          ))}
          <div className="grid grid-cols-4 gap-2 w-[80%] border-t-2 mx-auto mt-4 border-black">
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
        </>
      ) : (
        <p>Nothing Added in the Cart</p>
      )}
    </main>
  );
};

export default Checkout;
