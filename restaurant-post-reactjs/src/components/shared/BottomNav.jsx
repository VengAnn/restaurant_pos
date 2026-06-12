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
  const [guestCount, setguestCount] = useState(0);
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
    setguestCount(0);
    navigate("/tables");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
      <button
        onClick={() => navigate("/")}
        className={`flex items-center justify-center w-[200px] ${
          isActive("/")
            ? "text-[#f5f5f5] bg-[#343434] rounded-[20px]"
            : "text-[#ababab]"
        }`}
      >
        <FaHome className="inline mr-4" size={20} /> <p>Home</p>
      </button>
      <button
        onClick={() => navigate("/order")}
        className={`flex items-center justify-center w-[200px] ${
          isActive("/order")
            ? "text-[#f5f5f5] bg-[#343434] rounded-[20px]"
            : "text-[#ababab]"
        }`}
      >
        <MdOutlineReorder className="inline mr-4" size={20} /> <p>Orders</p>
      </button>

      <button
        onClick={() => navigate("/tables")}
        className={`flex items-center justify-center w-[200px] ${
          isActive("/tables")
            ? "text-[#f5f5f5] bg-[#343434] rounded-[20px]"
            : "text-[#ababab]"
        }`}
      >
        <MdTableBar className="inline mr-4" size={20} /> <p>Tables</p>
      </button>

      <button className="flex items-center justify-center text-[#ababab] w-[200px]">
        <CiCircleMore className="inline mr-4" size={20} /> <p>More</p>
      </button>

      <button
        disabled={isActive("/tables") || isActive("/menu")}
        onClick={openModal}
        className="absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 items-center"
      >
        <BiSolidDish size={40} />
      </button>

      {/* Modal component */}
      <Modal isOpen={isModelOpen} onClose={closeModal} title="Create Order">
        <div>
          {/* lable customer | input customer name */}
          <label className="block text-[#ababab] mb-2 text-sm font-medium">
            Customer Name
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>

          {/* lable customer phone | input customer phone */}
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
            Customer Phone
          </label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              placeholder="0974849555"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="bg-transparent flex-1 text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">
              Guest
            </label>
            {/* btn increase & decrease the number of guests */}
            <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
              <button
                onClick={decrementGuest}
                className="text-yellow-500 text-2xl"
              >
                &minus;
              </button>
              <span className="text-white">{guestCount} Person</span>
              <button
                onClick={incrementGuest}
                className="text-yellow-500 text-2xl"
              >
                &#43;
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleCreateOrder}
          className="w-full bg-[#f6B100] text-[#f5f5f5] rounded-lg py-3 mt-10 hover:bg-yellow-700"
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
