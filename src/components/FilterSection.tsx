import { ChangeEvent, ReactElement } from "react";
type FilterSectionProps = {
  activeOption: string;
  selected: string | number;
  handleOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  categories: string[];
  handleCategorySelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  prices: number[];
  handlePriceSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const FilterSection = ({
  activeOption,
  selected,
  handleOptionChange,
  categories,
  handleCategorySelect,
  prices,
  handlePriceSelect,
}: FilterSectionProps): ReactElement => {
  return (
    <>
      <select
        className="mx-2 border-black border"
        name="filter"
        id="filter"
        value={activeOption}
        onChange={handleOptionChange}
      >
        <option value="">Filter</option>
        <option value="Category">Category</option>
        <option value="Price">Price</option>
      </select>
      {activeOption === "Category" && (
        <select
          className="mx-2 border-black border"
          name="Category"
          id="Category"
          value={selected}
          onChange={(e) => {
            handleCategorySelect(e);
            if (e.target.value === "") {
              handleOptionChange(e);
            }
          }}
        >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}
      {activeOption === "Price" && (
        <select
          className="mx-2 outline outline-1"
          name="Price"
          id="Price"
          value={selected}
          onChange={(e) => {
            handlePriceSelect(e);
            if (e.target.value === "") {
              handleOptionChange(e);
            }
          }}
        >
          <option value="">All Prices</option>
          {prices.map((price, index) => (
            <option key={index} value={price}>
              {price}
            </option>
          ))}
        </select>
      )}
    </>
  );
};

export default FilterSection;
