import React, { useState } from "react";
import { useSelector } from "react-redux";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import MenuContainer from "../components/menu/MenuContainer";
import CustomerInfo from "../components/menu/CustomerInfo";
import CartInfo from "../components/menu/CartInfo";
import Bill from "../components/menu/Bill";

const Menu = () => {
  const customerData = useSelector((state) => state.customer);
  const cart = useSelector((state) => state.cart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <section className="bg-bg-primary h-[calc(100vh-5rem)] overflow-hidden flex flex-col lg:flex-row relative text-text-primary transition-colors duration-150">
      {/* Left Div (Menu & Dishes) */}
      <div className="flex-1 lg:flex-3 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-6 md:px-10 py-4 shrink-0">
          <div className="flex items-center gap-4">
            <BackButton />
            <h1 className="text-text-primary text-2xl font-bold tracking-wider">
              Menu
            </h1>
          </div>
          <div className="flex items-center gap-3 cursor-pointer bg-bg-secondary px-4 py-2 rounded-lg shadow-sm">
            <MdRestaurantMenu className="text-[#02ca3a] text-3xl shrink-0" />
            <div className="flex flex-col items-start min-w-0">
              <h1 className="text-sm text-text-primary font-bold tracking-wide truncate max-w-[120px] md:max-w-[200px]">
                {customerData.customerName || "Customer Name"}
              </h1>
              <p className="text-xs text-text-secondary font-medium">Table: {customerData.table || "N/A"}</p>
            </div>
          </div>
        </div>

        <MenuContainer />
      </div>

      {/* Right Div / Sidebar (Cart & Checkout) */}
      {/* Desktop View */}
      <div className="hidden lg:flex lg:w-[360px] xl:w-[400px] bg-bg-secondary mt-4 mr-4 h-[calc(100vh-10rem)] rounded-lg flex-col shrink-0 shadow-sm">
        <CustomerInfo />
        <div className="h-px bg-bg-primary" />
        <CartInfo />
        <div className="h-px bg-bg-primary" />
        <Bill />
      </div>

      {/* Mobile Drawer (Cart Overlay) */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 lg:hidden flex justify-end">
          <div className="w-[85%] sm:w-[450px] bg-bg-secondary h-full flex flex-col relative shadow-2xl animate-slide-in">
            {/* Close Button */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 left-[-45px] bg-bg-secondary text-text-primary p-2.5 rounded-l-lg cursor-pointer shadow-md"
            >
              <FaTimes size={18} />
            </button>
            <div className="flex-1 overflow-y-auto flex flex-col h-full">
              <CustomerInfo />
              <div className="h-px bg-bg-primary" />
              <CartInfo />
              <div className="h-px bg-bg-primary" />
              <Bill />
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) for Mobile Cart */}
      {totalItemsCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="lg:hidden fixed bottom-24 right-6 bg-[#02ca3a] text-white p-4 rounded-full shadow-2xl z-40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-150 animate-bounce cursor-pointer"
        >
          <div className="relative">
            <FaShoppingCart size={24} />
            <span className="absolute -top-3 -right-3 bg-yellow-500 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-bg-primary">
              {totalItemsCount}
            </span>
          </div>
        </button>
      )}

      <BottomNav />
    </section>
  );
};

export default Menu;
