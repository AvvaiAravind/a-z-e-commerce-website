import { ReactElement, useContext, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { DataContext, GadgetsType } from "../context/DataContext";

type GatgetProps = {
  gadget: GadgetsType;
};

const Gadget = ({ gadget }: GatgetProps): ReactElement => {
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  // hooks

  const { handleAddToCart } = useContext(DataContext);

  const handleAddToCartClick = async (id: string) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await handleAddToCart(id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingStates((prev) => ({
        ...prev,
        [id]: false,
      }));
    }
  };

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

      <button
        className="flex justify-evenly items-center"
        type="button"
        disabled={loadingStates[gadget.id]}
        onClick={() => handleAddToCartClick(gadget.id)}
      >
        {loadingStates[gadget.id] ? (
          <FaSpinner className="animate-spin" />
        ) : (
          "Add to Cart"
        )}
      </button>
    </section>
  );
};

export default Gadget;
