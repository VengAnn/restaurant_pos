import React, { useRef } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa6";

const CartInfo = () => {
  const cartData = [
    { id: 1, name: "Chicken Tikka", quantity: 2, price: 123 },
    { id: 2, name: "Chicken Tikka", quantity: 2, price: 123 },
    { id: 3, name: "Chicken Tikka", quantity: 2, price: 123 },
  ];
  const scrolLRef = useRef();

  return (
    <div className="px-4 py-2 flex-1 flex flex-col min-h-0">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>
      <div className="mt-4 overflow-y-scroll scrollbar-hide flex-1 min-h-0 pb-4" ref={scrolLRef} >
        {cartData.length === 0 ? (
          <p className="text-[#ababab] text-sm flex justify-center items-center flex-1">Your cart is empty. Start adding items!</p>
        ) : cartData.map((item, idx) => {
          return (
            <div key={idx} className="bg-[#1f1f1f] rounded-lg px-4 py-4 mb-2">
              <div className="flex items-center justify-between">
                <h1 className="text-[#ababab] font-semibold tracking-wide text-md">
                  {item.name}
                </h1>
                <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <RiDeleteBin2Fill
                    className="text-[#ababab] cursor-pointer"
                    size={20}
                  />
                  <FaNotesMedical
                    className="text-[#ababab] cursor-pointer"
                    size={20}
                  />
                </div>
                <p className="text-[#f5f5f5] text-md font-bold">₹{item.price}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartInfo;
