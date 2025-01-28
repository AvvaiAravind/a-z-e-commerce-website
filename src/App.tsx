import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <div className="flex-grow flex flex-col min-h-screen">
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/check-out" element={<Checkout />} />
        </Routes>
        <Footer />
      </DataProvider>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default App;
