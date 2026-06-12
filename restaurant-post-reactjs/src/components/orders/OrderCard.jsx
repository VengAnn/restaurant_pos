import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { formatDateAndTime, getAvatarName } from "../../utils/index";

const OrderCard = ({ order }) => {
  // Generate exact mock orders to match the screenshot
  const ordersToRender = order 
    ? [order] 
    : Array.from({ length: 12 }).map(() => ({
        customerDetails: { name: "Amrit Raj" },
        orderDate: "2025-01-18T20:32:00Z", // Will format to January 18, 2025 08:32 PM
        table: { tableNo: 1 },
        orderStatus: "Ready",
        items: Array.from({ length: 8 }, (_, j) => j + 1),
        bills: { totalWithTax: 250.0 },
        id: "101",
      }));

  return (
    <>
      {ordersToRender.map((mockOrder, idx) => (
        <div key={idx} className="w-[500px] bg-[#262626] p-4 rounded-lg mb-4">
          <div className="flex items-center gap-5">
            <button className="bg-[#f6b100] text-black p-3 text-xl font-bold rounded-lg w-14 h-14 flex items-center justify-center">
              AM
            </button>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start gap-1">
                <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
                  {mockOrder.customerDetails.name}
                </h1>
                <p className="text-[#ababab] text-sm">
                  #{mockOrder.id}/ Dine in
                </p>
                <p className="text-[#ababab] text-sm mt-1">
                  Table{" "}
                  <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />{" "}
                  {mockOrder.table.tableNo}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                {mockOrder.orderStatus === "Ready" ? (
                  <>
                    <p className="text-green-500 bg-[#2e4a40] px-3 py-1 rounded-lg text-sm font-semibold">
                      <FaCheckDouble className="inline mr-2" />{" "}
                      {mockOrder.orderStatus}
                    </p>
                    <p className="text-[#ababab] text-sm mt-1">
                      <FaCircle className="inline mr-2 text-green-500" /> Ready to
                      serve
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-yellow-500 bg-[#4a452e] px-3 py-1 rounded-lg text-sm font-semibold">
                      <FaCircle className="inline mr-2" /> {mockOrder.orderStatus}
                    </p>
                    <p className="text-[#ababab] text-sm mt-1">
                      <FaCircle className="inline mr-2 text-yellow-500" /> Preparing
                      your order
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-6 text-[#ababab]">
            <p>{formatDateAndTime(mockOrder.orderDate)}</p>
            <p>{mockOrder.items.length} Items</p>
          </div>
          <hr className="w-full mt-4 border-t border-gray-600" />
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-[#f5f5f5] text-lg font-bold">Total</h1>
            <p className="text-[#f5f5f5] text-lg font-bold">
              ₹{mockOrder.bills.totalWithTax.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderCard;
