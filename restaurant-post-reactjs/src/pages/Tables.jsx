import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTables } from "../api/endpoints";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import FullScreenLoader from "../components/shared/FullScreenLoader";

const Tables = () => {
  const [filterStatus, setFilterStatus] = useState("all");

  // Fetch tables from backend using TanStack React Query
  const { data: tablesRes, isLoading } = useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  if (isLoading) return <FullScreenLoader />;

  const tablesList = tablesRes?.data?.data || [];

  const filteredTables = tablesList.filter((table) => {
    if (filterStatus === "all") return true;
    return table.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <section className="bg-bg-primary min-h-[calc(100vh-5rem)] flex flex-col text-text-primary">
      <div className="flex items-center justify-between px-6 md:px-10 py-4 shrink-0">
        {/* title | btn back */}
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-text-primary text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>

        <div className="flex items-center justify-around gap-3">
          <button
            onClick={() => setFilterStatus("all")}
            className={`text-base md:text-lg rounded-lg px-4 md:px-5 py-1.5 md:py-2 font-semibold transition-all border cursor-pointer ${
              filterStatus === "all"
                ? "text-text-primary bg-bg-card-hover border-border-color shadow-sm"
                : "text-text-secondary bg-transparent border-transparent hover:text-text-primary"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("booked")}
            className={`text-base md:text-lg rounded-lg px-4 md:px-5 py-1.5 md:py-2 font-semibold transition-all border cursor-pointer ${
              filterStatus === "booked"
                ? "text-text-primary bg-bg-card-hover border-border-color shadow-sm"
                : "text-text-secondary bg-transparent border-transparent hover:text-text-primary"
            }`}
          >
            Booked
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-6 md:px-16 py-4 flex-1 min-h-0 overflow-y-auto scrollbar-hide pb-28">
        {filteredTables.map((table) => {
          return (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails?.name}
              seats={table.seats}
              bgColor={table.bgColor}
            />
          );
        })}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
