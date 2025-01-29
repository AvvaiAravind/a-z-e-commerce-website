import {
  ReactElement,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";

type FormDataType = {
  name: string;
  address: string;
  phoneNumber: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

type DataContextProps = {
  children?: ReactNode;
  gadgets: GadgetsType[];
  setGadgets: React.Dispatch<React.SetStateAction<GadgetsType[]>>;
  fetchError: string | null;
  isLoading: boolean;
  handleAddToCart: (id: string, userInput?: number) => Promise<void>;
  handleRemoveFrmCart: (id: string) => Promise<void>;
  totalItems: number;
  totalPrice: number;
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
  setTotalItems: React.Dispatch<React.SetStateAction<number>>;
  setTotalPrice: (value: React.SetStateAction<number>) => void;
  itemsInCart: GadgetsType[];
  setItemsInCart: React.Dispatch<React.SetStateAction<GadgetsType[]>>;
};

type DataProviderProps = {
  children: ReactNode;
};

export type GadgetsType = {
  id: string;
  name: string;
  image: string;
  price: number;
  addedToCart: boolean;
  quantity: number;
  category: string;
};
const initFormState = {
  name: "",
  address: "",
  phoneNumber: "",
  cardNumber: "",
  expiryDate: "",
  cvv: "",
};

const initialContext = {
  gadgets: [],
  setGadgets: () => {},
  fetchError: "",
  isLoading: false,
  handleAddToCart: async () => {},
  handleRemoveFrmCart: async () => {},
  totalItems: 0,
  totalPrice: 0,
  formData: initFormState,
  setFormData: () => {},
  setTotalItems: () => {},
  setTotalPrice: () => {},
  itemsInCart: [],
  setItemsInCart: () => {},
};

const DataContext = createContext<DataContextProps>(initialContext);

const DataProvider = ({ children }: DataProviderProps): ReactElement => {
  const [gadgets, setGadgets] = useState<GadgetsType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [formData, setFormData] = useState(initFormState);
  const [itemsInCart, setItemsInCart] = useState<GadgetsType[]>([]);
  // hooks

  const { data, fetchError, isLoading } = useFetch(
    "http://localhost:3000/gadgets"
  );

  // useEffect
  useEffect(() => {
    data && setGadgets(data);
  }, [data]);

  useEffect(() => {
    setItemsInCart(gadgets.filter((gadget) => gadget.addedToCart));
  }, [gadgets]);

  useEffect(() => {
    setTotalItems(
      itemsInCart.reduce((total, current) => total + current.quantity, 0)
    );

    setTotalPrice(
      itemsInCart.reduce(
        (total, current) => total + current.quantity * current.price,
        0
      )
    );
  }, [itemsInCart]);

  //functions

  const handleAddToCart = async (
    id: string,
    userInput?: number
  ): Promise<void> => {
    const gadgetToUpdate = gadgets.find((gadget) => gadget.id === id);
    const isAddedToCart = gadgetToUpdate?.addedToCart;
    const quantity = gadgetToUpdate?.quantity!;

    if (!gadgetToUpdate) return;

    if (!userInput && quantity >= 10) {
      toast.error("Can't purchase more than 10 at a time");
      return;
    }

    const updatePayload = isAddedToCart
      ? { quantity: userInput ?? quantity + 1 }
      : {
          addedToCart: true,
          quantity: userInput ?? quantity + 1,
        };

    try {
      const response = await fetch(`http://localhost:3000/gadgets/${id}`, {
        method: "PATCH",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setGadgets((prevGadgets) =>
        prevGadgets.map((gadget) =>
          gadget.id === id ? { ...gadget, ...data } : gadget
        )
      );
      toast.success("Item added successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log("An unknown error occurred. Please try again.");
      }
    }
  };

  const handleRemoveFrmCart = async (id: string): Promise<void> => {
    const updatePayload = {
      addedToCart: false,
      quantity: 0,
    };

    try {
      const response = await fetch(`http://localhost:3000/gadgets/${id}`, {
        method: "PATCH",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(updatePayload),
      });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setGadgets((prevGadgets) =>
        prevGadgets.map((gadget) =>
          gadget.id === id ? { ...gadget, ...data } : gadget
        )
      );
      toast.success("Item removed successfully");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log("An unknown error occurred. Please try again.");
        toast.error("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        gadgets,
        setGadgets,
        fetchError,
        isLoading,
        handleAddToCart,
        handleRemoveFrmCart,
        totalItems,
        totalPrice,
        formData,
        setFormData,
        setTotalItems,
        setTotalPrice,
        itemsInCart,
        setItemsInCart,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
