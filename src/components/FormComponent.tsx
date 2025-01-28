import { ChangeEvent, ReactElement, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { DataContext, GadgetsType } from "../context/DataContext";

type FormProps = {
  itemsInCart: GadgetsType[];
};

const FormComponent = ({ itemsInCart }: FormProps): ReactElement => {
  const initFormState = {
    name: "",
    address: "",
    phoneNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  };

  const { formData, setFormData, setGadgets, setTotalItems, setTotalPrice } =
    useContext(DataContext);

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/[^a-zA-Z ]/g, "")
      .replace(/\s+/g, " ")
      .trimStart();
    setFormData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{5})/g, "$1 ")
      .trim();
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: value,
    }));
  };

  const handleCardInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{4})/g, "$1 ")
      .trim();
    setFormData((prevData) => ({
      ...prevData,
      cardNumber: value,
    }));
  };

  const handleExpiryInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{1,2})?/, (_, mm, yy) => (yy ? `${mm}/${yy}` : mm))
      .trim();
    setFormData((prevData) => ({
      ...prevData,
      expiryDate: value,
    }));
  };

  const handleCvvInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData((prevData) => ({
      ...prevData,
      cvv: value,
    }));
  };

  const paymentSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    phoneNumber: z
      .string()
      .regex(/^\d{5}( \d{5})*$/, "Invalid phone number format"),
    cardNumber: z
      .string()
      .regex(
        /^(\d{4} ){3}\d{4}$/,
        "Card number must be 16 digits with spaces every 4 digits"
      ),
    expiryDate: z
      .string()
      .regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry date format"),
    cvv: z.string().length(4, "CVV must be 3 digits"),
  });

  const handleBulkUpdate = async (
    itemsInCart: GadgetsType[]
  ): Promise<void> => {
    const updatePayload = itemsInCart.map((item) => ({
      id: item.id,
      quantity: 0,
      addedToCart: false,
    }));

    try {
      const updatePromises = updatePayload.map((item) =>
        fetch(`http://localhost:3000/gadgets/${item.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        })
      );

      const responses = await Promise.all(updatePromises);
      responses.forEach((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
      });

      const updatedGadgets = await Promise.all(
        responses.map((response) => response.json())
      );

      setGadgets((prevGadgets) =>
        prevGadgets.map((gadget) => {
          const updatedItem = updatedGadgets.find(
            (item: GadgetsType) => item.id === gadget.id
          );
          return updatedItem ? { ...gadget, ...updatedItem } : gadget;
        })
      );

      setFormData(initFormState);
      setTotalItems(0);
      setTotalPrice(0);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      } else {
        console.log("An unknown error occurred. Please try again.");
        toast.error("An unknown error occurred. Please try again.");
      }
    } finally {
      toast.success("Order Placed successfully");
      setIsBtnLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = paymentSchema.safeParse(formData);

    if (!result.success) {
      toast.error("Please enter valid detail");
      console.error(result.error.errors);
    } else {
      setIsBtnLoading(true);
      handleBulkUpdate(itemsInCart);
    }
  };

  return (
    <form
      className="flex flex-wrap justify-evenly items-center gap-2 my-4"
      action=""
      onSubmit={handleSubmit}
    >
      <fieldset className="grid place-content-center gap-2 border p-4 border-black">
        <legend>Shipping Details</legend>
        <label htmlFor="name">Name:</label>
        <input
          className="border-black border"
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleNameInput}
          autoFocus
          placeholder="Your Name"
        />
        <label htmlFor="address">Address:</label>
        <textarea
          className="border-black border"
          name="address"
          id="address"
          cols={30}
          rows={5}
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        ></textarea>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          className="border-black border"
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handlePhoneInput}
          placeholder="88826 66357"
        />
      </fieldset>
      <div className="flex flex-col">
        <fieldset className="grid place-content-center gap-2 border p-4 border-black">
          <legend>Payment Details</legend>

          <label htmlFor="card">Card Number:</label>
          <input
            className="border-black border"
            type="text"
            name="cardNumber"
            id="cardNumber"
            placeholder="1234 5678 1234 5678"
            inputMode="numeric"
            pattern="^(\d{4} ){3}\d{4}$"
            value={formData.cardNumber}
            onChange={handleCardInput}
            maxLength={19}
          />
          <label htmlFor="expiry-date">Expiry Date:</label>
          <input
            className="border-black border"
            type="text"
            name="expiryDate"
            id="expiryDate"
            placeholder="MM/YY"
            value={formData.expiryDate}
            onChange={handleExpiryInput}
            maxLength={5}
          />
          <label htmlFor="cvv">CVV:</label>
          <input
            className="border-black border"
            type="text"
            name="cvv"
            id="cvv"
            placeholder="123"
            inputMode="numeric"
            pattern="\d*"
            value={formData.cvv}
            onChange={handleCvvInput}
            maxLength={4}
          />
        </fieldset>
        <button className="mt-4" type="submit" disabled={isBtnLoading}>
          Place Order
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
