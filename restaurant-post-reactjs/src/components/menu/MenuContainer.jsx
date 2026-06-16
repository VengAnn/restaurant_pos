import React, { useState } from "react";
import { GrRadialSelected as RadialIcon } from "react-icons/gr";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addItems, decrementItem } from "../../redux/slices/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "../../api/endpoints";
import FullScreenLoader from "../shared/FullScreenLoader";

const MenuContainer = () => {
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Fetch pre-grouped menu categories from backend using TanStack React Query
  const { data: menuRes, isLoading } = useQuery({
    queryKey: ["menuItems"],
    queryFn: getMenuItems,
  });

  if (isLoading) return <FullScreenLoader />;

  const menus = menuRes?.data?.data || [];

  // Fallback to first category if none is selected
  const selected = menus.find((m) => m.name === selectedCategoryName) || menus[0];

  const getItemQty = (itemId) => {
    const cartItem = cart.find((i) => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-11rem)] md:h-[calc(100vh-10rem)]">
      {/* Category Tabs/Pills - Horizontal scroll container */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide px-6 md:px-10 py-3 w-full shrink-0">
        {menus.map((menu) => {
          const isSelected = selected?.name === menu.name;
          return (
            <button
              key={menu.id}
              onClick={() => {
                setSelectedCategoryName(menu.name);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 select-none cursor-pointer ${
                isSelected
                  ? "text-white shadow-md scale-105"
                  : "bg-bg-secondary text-text-secondary hover:bg-bg-card-hover hover:text-text-primary"
              }`}
              style={{
                backgroundColor: isSelected ? menu.bgColor : undefined,
              }}
            >
              <span>{menu.icon}</span>
              <span>{menu.name}</span>
              <span
                className={`text-xs ml-1 px-2 py-0.5 rounded-full ${
                  isSelected ? "bg-white/20 text-white" : "bg-bg-primary text-text-secondary"
                }`}
              >
                {menu.items?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-[2px] bg-bg-primary shrink-0 mx-6 md:mx-10" />

      {/* Dishes Grid - Independent scroll container */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-6 md:px-10 py-4 pb-24">
        {menus.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 w-full text-text-secondary">
            <p className="text-xl font-semibold">No menu items found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {selected?.items?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col items-start justify-between p-4 rounded-lg h-[150px] cursor-pointer hover:bg-bg-card-hover bg-bg-card transition-all duration-150"
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col min-w-0 pr-2">
                      <h1 className="text-text-primary text-base font-semibold truncate w-full" title={item.name}>
                        {item.name}
                      </h1>
                      {item.subCategory && (
                        <span className="text-xs text-text-secondary mt-0.5">
                          {item.subCategory}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(addItems(item));
                      }}
                      className="bg-[#2e4a40] text-[#02ca3a] p-2 rounded-lg hover:bg-[#233830] transition-colors shrink-0"
                    >
                      <FaShoppingCart size={18} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between w-full mt-2">
                    <p className="text-text-primary text-lg font-bold">
                      ₹{item.price}
                    </p>
                    <div className="flex items-center justify-between bg-bg-input px-2.5 py-1 rounded-lg gap-2 w-28 shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(decrementItem(item.id));
                        }}
                        className="text-yellow-500 text-lg font-bold hover:text-yellow-400 transition-colors cursor-pointer select-none"
                      >
                        &minus;
                      </button>
                      <span className="text-text-primary text-sm font-semibold select-none">
                        {getItemQty(item.id)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addItems(item));
                        }}
                        className="text-yellow-500 text-lg font-bold hover:text-yellow-400 transition-colors cursor-pointer select-none"
                      >
                        &#43;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuContainer;
