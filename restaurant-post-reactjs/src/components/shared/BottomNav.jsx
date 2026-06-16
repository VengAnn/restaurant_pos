import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCustomer } from "../../redux/slices/customerSlice";
import Modal from "./Modal";

const BottomNav = () => {
  // Hooks for routing and active tab checks
  const navigate = useNavigate();
  //useLocation hook used to get current active tab
  const location = useLocation();
  const dispatch = useDispatch();

  // state for customer form inputs
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  //state for guest count
  const [guestCount, setguestCount] = useState(1);
  //state for modal visibility
  const [isModelOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const incrementGuest = () => {
    if (guestCount >= 6) return;
    setguestCount((prev) => prev + 1);
  };
  const decrementGuest = () => {
    if (guestCount <= 1) return;
    setguestCount((prev) => prev - 1);
  };

  const handleCreateOrder = () => {
    // Dispatch customer details to Redux
    dispatch(
      setCustomer({
        name: customerName,
        phone: customerPhone,
        guests: guestCount,
      }),
    );
    closeModal();
    // Reset inputs
    setCustomerName("");
    setCustomerPhone("");
    setguestCount(1);
    navigate("/tables");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-border-color p-2 h-16 flex justify-around items-center z-40 transition-colors duration-150">
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center py-2 px-3 sm:px-6 w-full max-w-[140px] transition-all cursor-pointer ${
          isActive("/")
            ? "text-text-primary bg-bg-card-hover rounded-[20px] font-semibold shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <FaHome className="text-xl md:mr-2" />
        <span className="hidden md:inline text-sm">Home</span>
      </button>

      <button
        onClick={() => navigate("/order")}
        className={`flex items-center justify-center py-2 px-3 sm:px-6 w-full max-w-[140px] transition-all cursor-pointer ${
          isActive("/order")
            ? "text-text-primary bg-bg-card-hover rounded-[20px] font-semibold shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <MdOutlineReorder className="text-xl md:mr-2" />
        <span className="hidden md:inline text-sm">Orders</span>
      </button>

      {/* Spacer to make room for absolute central FAB on small screens */}
      <div className="w-14 sm:w-16 md:w-0 shrink-0" />

      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center py-2 px-3 sm:px-6 w-full max-w-[140px] transition-all cursor-pointer ${
          isActive("/tables")
            ? "text-text-primary bg-bg-card-hover rounded-[20px] font-semibold shadow-sm"
            : "text-text-secondary hover:text-text-primary"
        }`}
      >
        <MdTableBar className="text-xl md:mr-2" />
        <span className="hidden md:inline text-sm">Tables</span>
      </button>

      <button className="flex items-center justify-center py-2 px-3 sm:px-6 w-full max-w-[140px] text-text-secondary hover:text-text-primary transition-all cursor-pointer">
        <CiCircleMore className="text-xl md:mr-2" />
        <span className="hidden md:inline text-sm">More</span>
      </button>

      {/* Center FAB button */}
      <button
        disabled={isActive("/tables") || isActive("/menu")}
        onClick={openModal}
        className="absolute bottom-4 bg-[#F6B100] text-black rounded-full p-4 items-center shadow-lg hover:scale-110 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all duration-150 cursor-pointer z-50 border-4 border-bg-primary"
      >
        <BiSolidDish className="text-3xl" />
      </button>

      {/* Modal component */}
      <Modal isOpen={isModelOpen} onClose={closeModal} title="Create Order">
        <div>
          <label className="block text-text-secondary mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-bg-input">
            <input
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-transparent flex-1 text-text-primary focus:outline-none text-sm"
            />
          </div>

          <label className="block text-text-secondary mb-2 mt-4 text-sm font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-bg-input">
            <input
              type="text"
              placeholder="0974849555"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="bg-transparent flex-1 text-text-primary focus:outline-none text-sm"
            />
          </div>

          <div>
            <label className="block mb-2 mt-4 text-sm font-medium text-text-secondary">
              Guests
            </label>
            <div className="flex items-center justify-between bg-bg-input px-4 py-3 rounded-lg">
              <button
                onClick={decrementGuest}
                className="text-yellow-500 text-2xl font-bold hover:text-yellow-400 select-none cursor-pointer"
              >
                &minus;
              </button>
              <span className="text-text-primary text-sm font-medium">{guestCount} Person</span>
              <button
                onClick={incrementGuest}
                className="text-yellow-500 text-2xl font-bold hover:text-yellow-400 select-none cursor-pointer"
              >
                &#43;
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateOrder}
          className="w-full bg-[#f6B100] text-black font-bold rounded-lg py-3 mt-8 hover:bg-yellow-500 active:scale-95 transition-all duration-150 cursor-pointer"
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
