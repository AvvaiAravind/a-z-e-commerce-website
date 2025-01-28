import { ReactElement, useContext } from "react";
import { DataContext, GadgetsType } from "../context/DataContext";

type GatgetProps = {
  gadget: GadgetsType;
};

const Gadget = ({ gadget }: GatgetProps): ReactElement => {
  // hooks
  const { handleAddToCart } = useContext(DataContext);

  return (
    <section className="p-4">
      <h2>{gadget.name}</h2>
      <figure className="w-64 h-64 border-black border rounded-xl ">
        <img
          src={`/public/images/${gadget.image}`}
          alt={gadget.name}
          title={gadget.name}
          className="w-full h-full rounded-xl"
        />
      </figure>
      <div className="flex justify-between items-center">
        <p>{gadget.price}</p>
        {gadget.addedToCart && <p>Item added to cart - {gadget.quantity}</p>}
      </div>

      <button type="button" onClick={() => handleAddToCart(gadget.id)}>
        Add to Cart
      </button>
    </section>
  );
};

export default Gadget;
