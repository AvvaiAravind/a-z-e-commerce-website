import { ChangeEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext, GadgetsType } from "../context/DataContext";
import FilterSection from "./FilterSection";
import IndividualCart from "./IndividualCart";

const Cart = () => {
  const { gadgets, totalItems, totalPrice } = useContext(DataContext);
  const itemsInCart = gadgets.filter((gadget) => gadget.addedToCart);
  const navigate = useNavigate();

  const [activeOption, setActiveOption] = useState<string>("");
  const [selected, setSelected] = useState<string | number>("");

  const filteredGadgets: GadgetsType[] = itemsInCart.filter((gadget) => {
    if (activeOption === "Category" && selected)
      return gadget.category === selected;
    if (activeOption === "Price" && selected)
      return gadget.price <= Number(selected);
    return true;
  });
  const categories = [
    "Home Appliance",
    "Electronics",
    "Clothing",
    "Toys",
    "Groceries",
    "Books",
  ];

  const prices = [500, 1000, 2000, 5000];

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveOption(e.target.value);
    setSelected("");
  };

  const handleCategorySelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const choice = e.target.value;
    if (choice) setSelected(choice);
  };

  const handlePriceSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const choice = e.target.value;
    if (choice) setSelected(choice);
  };

  return (
    <main className="flex-grow">
      <section className="flex justify-center items-center m-2">
        {
          <FilterSection
            activeOption={activeOption}
            selected={selected}
            handleOptionChange={handleOptionChange}
            categories={categories}
            handleCategorySelect={handleCategorySelect}
            prices={prices}
            handlePriceSelect={handlePriceSelect}
          />
        }
      </section>
      <section className={`${!filteredGadgets.length && "flex"}`}>
        <ul
          className={` flex flex-wrap justify-evenly ${
            !filteredGadgets.length &&
            "flex flex-grow justify-center items-center"
          }`}
        >
          {filteredGadgets.length > 0 ? (
            filteredGadgets.map(
              (gadget) =>
                gadget.addedToCart && (
                  <IndividualCart key={gadget.id} gadget={gadget} />
                )
            )
          ) : (
            <li className="text-center">Nothing Added to Cart</li>
          )}
        </ul>
        {filteredGadgets.length > 0 && (
          <section className="flex xs:flex-col justify-evenly items-center">
            <div className="md:hidden my-4 text-center">
              <p>Total Items = {totalItems}</p>
              <p>Total Price = {totalPrice}</p>
            </div>
            <div className="space-x-2 my-4">
              <button type="button" onClick={() => navigate("/")}>
                Continue Shopping
              </button>
              <button type="button" onClick={()=>navigate("/check-out")}>Checkout</button>
            </div>
          </section>
        )}
      </section>
    </main>
  );
};

export default Cart;
