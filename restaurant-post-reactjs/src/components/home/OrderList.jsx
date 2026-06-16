import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { getAvatarName } from "../../utils/index";

const OrderList = ({ order }) => {
  if (!order) return null;

  return (
    <div className="flex items-center gap-4 py-2 w-full">
      <button className="bg-[#f6b100] p-3 text-lg font-bold rounded-lg text-black w-10 h-10 flex items-center justify-center shrink-0">
        {getAvatarName(order.customerDetails?.name) || "CU"}
      </button>
      <div className="flex items-center justify-between w-full min-w-0">
        <div className="flex flex-col items-start gap-0.5 min-w-0">
          <h1 className="text-text-primary text-sm font-semibold tracking-wide truncate w-full max-w-[120px] sm:max-w-[200px]">
            {order.customerDetails?.name || "Customer"}
          </h1>
          <p className="text-text-secondary text-xs">{(order.items || []).length} Items</p>
        </div>

        <h1 className="text-[#f6b100] bg-[#f6b100]/10 font-semibold rounded-lg px-2 py-0.5 text-xs whitespace-nowrap">
          Table <FaLongArrowAltRight className="text-text-secondary ml-1 mr-1 inline" />{" "}
          {order.table?.tableNo || "N/A"}
        </h1>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {order.orderStatus === "Ready" ? (
            <p className="text-green-500 bg-[#2e4a40] px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
              <FaCheckDouble size={10} /> {order.orderStatus}
            </p>
          ) : order.orderStatus === "Completed" ? (
            <p className="text-gray-400 bg-bg-tertiary px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
              <FaCheckDouble size={10} /> {order.orderStatus}
            </p>
          ) : (
            <p className="text-yellow-500 bg-[#4a452e] px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
              <FaCircle size={8} /> {order.orderStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
