import { ChangeEvent, useContext, useState } from "react";
import { DataContext, GadgetsType } from "../context/DataContext";
import FilterSection from "./FilterSection";
import Gadget from "./Gadget";

const Home = () => {
  const { gadgets, fetchError, isLoading } = useContext(DataContext);
  const [activeOption, setActiveOption] = useState<string>("");
  const [selected, setSelected] = useState<string | number>("");

  const filteredGadgets: GadgetsType[] = gadgets.filter((gadget) => {
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
      <section
        className={` p-2 flex flex-wrap justify-center ${
          !filteredGadgets.length || fetchError || isLoading
            ? "items-center"
            : ""
        }
      `}
      >
        {isLoading && <p>....Loading</p>}
        {!fetchError && !isLoading && filteredGadgets.length
          ? filteredGadgets.map((gadget) => (
              <Gadget key={gadget.id} gadget={gadget} />
            ))
          : !isLoading &&
            !fetchError && <p className="text-center">No Data Found</p>}
        {fetchError && !isLoading && (
          <p className="text-center">{fetchError} </p>
        )}
      </section>
    </main>
  );
};

export default Home;
