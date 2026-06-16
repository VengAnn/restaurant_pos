import React from "react";
import { FaCheckDouble, FaLongArrowAltRight } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { updateOrderStatus, updateTable } from "../../api/endpoints";
import { formatDateAndTime, getAvatarName } from "../../utils/index";

const OrderCard = ({ order }) => {
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: ({ orderId, orderStatus }) =>
      updateOrderStatus({ orderId, orderStatus }),
    onSuccess: async (res, variables) => {
      enqueueSnackbar(`Order updated to ${variables.orderStatus}`, {
        variant: "success",
      });
      queryClient.invalidateQueries(["orders"]);

      // If the order is marked Completed, free the associated table!
      if (variables.orderStatus === "Completed" && order?.table?._id) {
        try {
          await updateTable({
            tableId: order.table._id,
            status: "Available",
            orderId: null,
          });
          queryClient.invalidateQueries(["tables"]);
        } catch (err) {
          console.error("Failed to free table:", err);
        }
      }
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || "Failed to update status";
      enqueueSnackbar(errMsg, { variant: "error" });
    },
  });

  const handleStatusChange = (currentStatus) => {
    if (!order?._id) return;
    let nextStatus = "Preparing";
    if (currentStatus === "Preparing" || currentStatus === "Pending") {
      nextStatus = "Ready";
    } else if (currentStatus === "Ready") {
      nextStatus = "Completed";
    } else {
      return; // Already completed
    }
    statusMutation.mutate({ orderId: order._id, orderStatus: nextStatus });
  };

  const ordersToRender = order ? [order] : [];

  return (
    <>
      {ordersToRender.map((mockOrder, idx) => (
        <div key={idx} className="w-full bg-bg-card p-5 rounded-lg mb-4 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="bg-[#f6b100] text-black p-3 text-lg font-bold rounded-lg w-12 h-12 flex items-center justify-center shrink-0">
              {getAvatarName(mockOrder.customerDetails?.name) || "CU"}
            </button>
            <div className="flex items-center justify-between w-full min-w-0">
              <div className="flex flex-col items-start gap-0.5 min-w-0 pr-2">
                <h1 className="text-text-primary text-base font-bold truncate w-full">
                  {mockOrder.customerDetails?.name || "Customer"}
                </h1>
                <p className="text-text-secondary text-xs truncate w-full">
                  #{mockOrder._id ? mockOrder._id.toString().slice(-6).toUpperCase() : mockOrder.id} / Dine in
                </p>
                <p className="text-text-secondary text-xs mt-1 flex items-center gap-1.5">
                  Table
                  <FaLongArrowAltRight className="text-text-secondary inline" />
                  <span className="text-text-primary font-semibold">{mockOrder.table?.tableNo || "N/A"}</span>
                </p>
              </div>
              <div 
                className={`flex flex-col items-end gap-1.5 shrink-0 ${mockOrder.orderStatus !== "Completed" && order?._id ? "cursor-pointer hover:opacity-80" : ""}`}
                onClick={() => mockOrder.orderStatus !== "Completed" && order?._id && handleStatusChange(mockOrder.orderStatus)}
              >
                {mockOrder.orderStatus === "Completed" ? (
                  <>
                    <p className="text-gray-400 bg-bg-input px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <FaCheckDouble size={10} /> Completed
                    </p>
                    <p className="text-text-secondary text-[10px] mt-0.5"> Served </p>
                  </>
                ) : mockOrder.orderStatus === "Ready" ? (
                  <>
                    <p className="text-green-500 bg-[#2e4a40] px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 animate-pulse">
                      <FaCheckDouble size={10} /> {mockOrder.orderStatus}
                    </p>
                    <p className="text-text-secondary text-[10px] mt-0.5"> Click to complete </p>
                  </>
                ) : (
                  <>
                    <p className="text-yellow-500 bg-[#4a452e] px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <FaCircle size={6} /> {mockOrder.orderStatus}
                    </p>
                    <p className="text-text-secondary text-[10px] mt-0.5"> Click to ready </p>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 text-text-secondary text-xs">
            <p>{formatDateAndTime(mockOrder.orderDate)}</p>
            <p className="font-semibold">{mockOrder.items.length} Items</p>
          </div>
          <div className="w-full h-px bg-bg-primary mt-4" />
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-text-primary text-base font-bold">Total</h1>
            <p className="text-text-primary text-base font-extrabold">
              ₹{mockOrder.bills.totalWithTax.toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderCard;
