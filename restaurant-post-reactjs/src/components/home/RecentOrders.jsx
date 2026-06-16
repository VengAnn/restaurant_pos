import React from "react";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";

const RecentOrders = ({ orders }) => {
  const recentList = orders || [];

  return (
    <div className="px-6 md:px-8 mt-4 mb-6">
      <div className="bg-bg-secondary border border-border-color w-full h-[370px] rounded-lg shadow-sm flex flex-col">
        <div className="flex justify-between items-center px-6 py-3 shrink-0">
          <h1 className="text-text-primary text-base font-bold tracking-wide">
            Recent Orders
          </h1>
          <a
            href=""
            className="text-[#025cca] text-xs font-semibold hover:underline"
          >
            View all
          </a>
        </div>

        <div className="flex items-center gap-4 bg-bg-input rounded-[15px] px-4 py-2 mx-6 shrink-0">
          <FaSearch className="text-text-secondary text-sm" />
          <input
            type="text"
            placeholder="Search recent orders"
            className="bg-transparent outline-none text-text-primary text-sm flex-1 placeholder-text-secondary"
          />
        </div>

        {/* Order list */}
        <div className="mt-3 px-6 overflow-y-auto flex-1 scrollbar-hide flex flex-col gap-1.5 pb-4">
          {recentList.length > 0 ? (
            recentList.map((ord) => (
              <OrderList key={ord._id || ord.id} order={ord} />
            ))
          ) : (
            <div className="flex items-center justify-center py-10 my-auto">
              <p className="text-text-secondary text-sm">No recent orders</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
