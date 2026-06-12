import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import OrderCard from "../components/orders/OrderCard";
import BackButton from "../components/shared/BackButton";

const Order = () => {
  const [status, setStatus] = useState("all");

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-10 py-4">
        {/* title | btn back */}
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Orders
          </h1>
        </div>

        {/* status filters */}
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            style={{
              backgroundColor: status === "all" ? "#383838" : "transparent",
            }}
            className={`text-lg rounded-lg px-5 py-2 font-semibold transition-colors ${status === "all" ? "text-[#f5f5f5]" : "text-[#ababab]"}`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("progress")}
            style={{
              backgroundColor:
                status === "progress" ? "#383838" : "transparent",
            }}
            className={`text-lg rounded-lg px-5 py-2 font-semibold transition-colors ${status === "progress" ? "text-[#f5f5f5]" : "text-[#ababab]"}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setStatus("ready")}
            style={{
              backgroundColor: status === "ready" ? "#383838" : "transparent",
            }}
            className={`text-lg rounded-lg px-5 py-2 font-semibold transition-colors ${status === "ready" ? "text-[#f5f5f5]" : "text-[#ababab]"}`}
          >
            Ready
          </button>
          <button
            onClick={() => setStatus("completed")}
            style={{
              backgroundColor:
                status === "completed" ? "#383838" : "transparent",
            }}
            className={`text-lg rounded-lg px-5 py-2 font-semibold transition-colors ${status === "completed" ? "text-[#f5f5f5]" : "text-[#ababab]"}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Scrollable grid container for the cards */}
      <div className="px-10 py-4 flex-1 min-h-0 overflow-y-scroll scrollbar-hide flex flex-wrap gap-6 items-start pb-24">
        <OrderCard />
      </div>

      <BottomNav />
    </section>
  );
};

export default Order;
