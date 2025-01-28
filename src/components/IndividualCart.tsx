import React, { ChangeEvent, useContext, useState } from "react";
import { DataContext, GadgetsType } from "../context/DataContext";

interface IndividualCartProps {
  gadget: GadgetsType;
}

const IndividualCart: React.FC<IndividualCartProps> = ({ gadget }) => {
  const { handleAddToCart, handleRemoveFrmCart } = useContext(DataContext);
  const [localQuantity, setLocalQuantity] = useState<number>(
    gadget.quantity || 1
  );

  const handleQuantityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setLocalQuantity(value);
    handleAddToCart(gadget.id, value);
  };

  return (
    <li className="flex flex-col gap-2 md:flex-row items-center justify-evenly px-2 my-2">
      <figure className="w-32 h-32 bg-white border-black border rounded-xl">
        <img
          src={`/public/images/${gadget.image}`}
          alt={gadget.name}
          title={gadget.name}
          className="w-full h-full rounded-xl"
        />
      </figure>
      <p>{gadget.price}</p>
      <p>
        Total Price <span className="md:hidden"> of {gadget.name}</span> ={" "}
        {gadget.price * gadget.quantity}
      </p>
      <div className="space-x-4">
        <select
          name={gadget.id}
          id={gadget.id}
          value={localQuantity}
          onChange={handleQuantityChange}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button type="button" onClick={() => handleRemoveFrmCart(gadget.id)}>
          Remove item
        </button>
      </div>
    </li>
  );
};

export default IndividualCart;
