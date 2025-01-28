import { ReactElement, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

type HeaderProps = {
  title?: string;
};

const Header = ({ title = "A-Z e-com" }: HeaderProps): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, totalPrice } = useContext(DataContext);

  return (
    <header className="sticky top-0 bg-black text-white">
      <section className="flex justify-evenly lg:justify-between py-2 lg:px-2">
        <h1 className="">{title}</h1>
        <div className="hidden md:block">
          <p>Total Items = {totalItems}</p>
          <p>Total Price = {totalPrice}</p>
        </div>
        <div className="flex flex-col justify-center">
          {location.pathname === "/" ? (
            <button className="bg-white text-black" type="button" onClick={() => navigate("/cart")}>
              View Cart
            </button>
          ) : (
            <button className="bg-white text-black"type="button" onClick={() => navigate("/")}>
              View Home
            </button>
          )}
        </div>
      </section>
    </header>
  );
};

export default Header;
