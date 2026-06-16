import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/endpoints";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";
import FullScreenLoader from "../components/shared/FullScreenLoader";

const Order = () => {
  const [status, setStatus] = useState("all");

  // Fetch orders from backend using TanStack React Query
  const { data: ordersRes, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) return <FullScreenLoader />;

  const ordersList = ordersRes?.data?.data || [];

  const filteredOrders = ordersList.filter((ord) => {
    if (status === "all") return true;
    if (status === "progress") {
      return (
        ord.orderStatus.toLowerCase() === "preparing" ||
        ord.orderStatus.toLowerCase() === "progress"
      );
    }
    return ord.orderStatus.toLowerCase() === status.toLowerCase();
  });

  return (
    <section className="bg-bg-primary min-h-[calc(100vh-5rem)] flex flex-col text-text-primary">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 md:px-10 py-4 gap-3 shrink-0">
        {/* title | btn back */}
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-text-primary text-2xl font-bold tracking-wider">
            Orders
          </h1>
        </div>

        {/* status filters */}
        <div className="flex items-center justify-around gap-2 overflow-x-auto scrollbar-hide py-1">
          <button
            onClick={() => setStatus("all")}
            className={`text-sm md:text-base rounded-lg px-4 md:px-5 py-1.5 md:py-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              status === "all"
                ? "text-text-primary bg-bg-card-hover shadow-sm"
                : "text-text-secondary bg-transparent hover:text-text-primary"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("progress")}
            className={`text-sm md:text-base rounded-lg px-4 md:px-5 py-1.5 md:py-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              status === "progress"
                ? "text-text-primary bg-bg-card-hover shadow-sm"
                : "text-text-secondary bg-transparent hover:text-text-primary"
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatus("ready")}
            className={`text-sm md:text-base rounded-lg px-4 md:px-5 py-1.5 md:py-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              status === "ready"
                ? "text-text-primary bg-bg-card-hover shadow-sm"
                : "text-text-secondary bg-transparent hover:text-text-primary"
            }`}
          >
            Ready
          </button>
          <button
            onClick={() => setStatus("completed")}
            className={`text-sm md:text-base rounded-lg px-4 md:px-5 py-1.5 md:py-2 font-semibold transition-all cursor-pointer whitespace-nowrap ${
              status === "completed"
                ? "text-text-primary bg-bg-card-hover shadow-sm"
                : "text-text-secondary bg-transparent hover:text-text-primary"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Scrollable grid container for the cards */}
      <div className="px-6 md:px-10 py-4 flex-1 min-h-0 overflow-y-auto scrollbar-hide grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 items-start pb-28 w-full">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((ord) => (
            <OrderCard key={ord._id || ord.id} order={ord} />
          ))
        ) : (
          <div className="flex items-center justify-center w-full py-20">
            <p className="text-text-secondary text-lg font-medium">No orders found.</p>
          </div>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Order;
