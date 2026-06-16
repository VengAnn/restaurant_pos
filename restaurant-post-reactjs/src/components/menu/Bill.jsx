import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { getTotalPrice, removeAllItems } from "../../redux/slices/cartSlice";
import { removeCustomer } from "../../redux/slices/customerSlice";
import { addOrder, updateTable as updateTableApi } from "../../api/endpoints";

const TAX_RATE = 0.0525; // 5.25% tax rate

const Bill = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const cartData = useSelector((state) => state.cart);
  const customerData = useSelector((state) => state.customer);

  const total = useSelector(getTotalPrice);
  const tax = total * TAX_RATE;
  const totalPriceWithTax = total + tax;
  const totalQty = cartData.reduce((sum, item) => sum + item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const orderMutation = useMutation({
    mutationFn: (newOrder) => addOrder(newOrder),
    onSuccess: async (res) => {
      const createdOrder = res.data;
      if (customerData.tableId && createdOrder?.data?._id) {
        try {
          await updateTableApi({
            tableId: customerData.tableId,
            status: "Booked",
            orderId: createdOrder.data._id,
          });
          queryClient.invalidateQueries(["tables"]);
        } catch (err) {
          console.error("Failed to update table status:", err);
        }
      }
      enqueueSnackbar("Order Placed Successfully!", { variant: "success" });
      dispatch(removeAllItems());
      dispatch(removeCustomer());
      queryClient.invalidateQueries(["orders"]);
      navigate("/order");
    },
    onError: (error) => {
      const errMsg = error.response?.data?.message || "Failed to place order";
      enqueueSnackbar(errMsg, { variant: "error" });
    },
  });

  const handlePlaceOrder = () => {
    if (cartData.length === 0) {
      enqueueSnackbar("Please add items to the cart before placing an order.", {
        variant: "warning",
      });
      return;
    }

    const orderPayload = {
      customerDetails: {
        name: customerData.customerName || "Walk-in Customer",
        phone: customerData.customerPhone || "0000000000",
        guests: customerData.guests || 1,
      },
      orderStatus: "Preparing",
      bills: {
        total: total,
        tax: tax,
        totalWithTax: totalPriceWithTax,
      },
      items: cartData.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      table: customerData.tableId || null,
      paymentMethod,
    };

    orderMutation.mutate(orderPayload);
  };

  return (
    <div className="bg-bg-secondary p-4 text-text-primary shrink-0">
      <div className="flex items-center justify-between mt-1">
        <p className="text-xs text-text-secondary font-medium">
          Items({totalQty})
        </p>
        <h1 className="text-text-primary text-sm font-bold">
          ₹{total.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-text-secondary font-medium">Tax({(TAX_RATE * 100).toFixed(2)}%)</p>
        <h1 className="text-text-primary text-sm font-bold">₹{tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-text-secondary font-medium">
          Total With Tax
        </p>
        <h1 className="text-text-primary text-base font-bold">
          ₹{totalPriceWithTax.toFixed(2)}
        </h1>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`px-4 py-2.5 w-full rounded-lg text-text-secondary font-semibold transition-all cursor-pointer text-sm ${
            paymentMethod === "Cash"
              ? "bg-bg-card-hover text-text-primary shadow-sm"
              : "bg-bg-input border-transparent hover:text-text-primary"
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`px-4 py-2.5 w-full rounded-lg text-text-secondary font-semibold transition-all cursor-pointer text-sm ${
            paymentMethod === "Online"
              ? "bg-bg-card-hover text-text-primary shadow-sm"
              : "bg-bg-input border-transparent hover:text-text-primary"
          }`}
        >
          Online
        </button>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button className="bg-[#025cca] px-4 py-2.5 w-full rounded-lg text-white font-semibold text-base hover:bg-[#024aa3] active:scale-95 transition-all cursor-pointer">
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-2.5 w-full rounded-lg text-[#1f1f1f] font-bold text-base hover:bg-yellow-500 active:scale-95 transition-all cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Bill;
