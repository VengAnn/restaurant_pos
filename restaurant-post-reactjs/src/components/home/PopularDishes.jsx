import React from "react";
import { BiDish } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getPopularDishes } from "../../api/endpoints";

const PopularDishes = () => {
  // Fetch popular dishes directly from the backend API using React Query
  const { data: popularRes, isLoading } = useQuery({
    queryKey: ["popularDishes"],
    queryFn: getPopularDishes,
  });

  if (isLoading) {
    return (
      <div className="mt-6 px-6 lg:px-0 lg:pr-6">
        <div className="bg-bg-secondary border border-border-color w-full rounded-lg h-[400px] flex items-center justify-center text-text-secondary">
          Loading popular dishes...
        </div>
      </div>
    );
  }

  const listToRender = popularRes?.data?.data || [];

  return (
    <div className="mt-6 px-6 lg:px-0 lg:pr-6 mb-24 lg:mb-6">
      <div className="bg-bg-secondary border border-border-color w-full rounded-lg shadow-sm">
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-text-primary text-base font-bold tracking-wide">
            Popular Dishes
          </h1>
          <a
            href=""
            className="text-[#025cca] text-sm font-semibold hover:underline"
          >
            View all
          </a>
        </div>

        <div className="overflow-y-auto h-[350px] lg:h-[680px] scrollbar-hide pb-6">
          {listToRender.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-text-secondary">
              No sales data yet
            </div>
          ) : (
            listToRender.map((dish, index) => {
              const rank = index + 1;
              return (
                <div
                  key={dish.name}
                  className="flex items-center gap-4 bg-bg-card border border-border-color rounded-[15px] px-6 py-4 mt-4 mx-6"
                >
                  <h1 className="text-text-primary font-extrabold text-lg mr-2">
                    {rank < 10 ? `0${rank}` : rank}
                  </h1>
                  <div className="w-[45px] h-[45px] rounded-full bg-[#f6b100] text-black flex items-center justify-center text-xl shrink-0">
                    <BiDish />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-text-primary font-semibold tracking-wide text-sm truncate">
                      {dish.name}
                    </h1>
                    <p className="text-text-secondary text-xs mt-0.5">
                      Orders:{" "}
                      <span className="text-text-primary font-bold">
                        {dish.numberOfOrders}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;
