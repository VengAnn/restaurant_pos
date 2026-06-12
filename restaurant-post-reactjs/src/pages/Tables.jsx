import React, { useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";

const Tables = ({ resData }) => {
  const [filterStatus, setFilterStatus] = useState("all");

  const tablesList = resData?.data?.data || [
    {
      _id: "1",
      tableNo: "1",
      status: "Booked",
      currentOrder: { customerDetails: { name: "Amrit Raj" } },
      seats: 4,
      bgColor: "#f6b100",
    },
    {
      _id: "2",
      tableNo: "2",
      status: "Available",
      currentOrder: { customerDetails: { name: "M B" } },
      seats: 6,
      bgColor: "#025cca",
    },
    {
      _id: "3",
      tableNo: "3",
      status: "Booked",
      currentOrder: { customerDetails: { name: "J S" } },
      seats: 2,
      bgColor: "#f6b100",
    },
    {
      _id: "4",
      tableNo: "4",
      status: "Available",
      currentOrder: { customerDetails: { name: "H R" } },
      seats: 4,
      bgColor: "#f6b100",
    },
    {
      _id: "5",
      tableNo: "5",
      status: "Booked",
      currentOrder: { customerDetails: { name: "P L" } },
      seats: 3,
      bgColor: "#f6b100",
    },
    {
      _id: "6",
      tableNo: "6",
      status: "Available",
      currentOrder: { customerDetails: { name: "R T" } },
      seats: 4,
      bgColor: "#1f1f1f",
    },
    {
      _id: "7",
      tableNo: "7",
      status: "Booked",
      currentOrder: { customerDetails: { name: "L C" } },
      seats: 5,
      bgColor: "#025cca",
    },
    {
      _id: "8",
      tableNo: "8",
      status: "Available",
      currentOrder: { customerDetails: { name: "D P" } },
      seats: 5,
      bgColor: "#025cca",
    },
    {
      _id: "9",
      tableNo: "9",
      status: "Booked",
      currentOrder: { customerDetails: { name: "N K" } },
      seats: 6,
      bgColor: "#02ca3a",
    },
    {
      _id: "10",
      tableNo: "10",
      status: "Available",
      currentOrder: { customerDetails: { name: "S B" } },
      seats: 6,
      bgColor: "#1f1f1f",
    },
    {
      _id: "11",
      tableNo: "11",
      status: "Booked",
      currentOrder: { customerDetails: { name: "G T" } },
      seats: 4,
      bgColor: "#02ca3a",
    },
    {
      _id: "12",
      tableNo: "12",
      status: "Available",
      currentOrder: { customerDetails: { name: "J S" } },
      seats: 6,
      bgColor: "#1f1f1f",
    },
    {
      _id: "13",
      tableNo: "13",
      status: "Booked",
      currentOrder: { customerDetails: { name: "E K" } },
      seats: 2,
      bgColor: "#02ca3a",
    },
    {
      _id: "14",
      tableNo: "14",
      status: "Available",
      currentOrder: { customerDetails: { name: "Q N" } },
      seats: 6,
      bgColor: "#025cca",
    },
    {
      _id: "15",
      tableNo: "15",
      status: "Booked",
      currentOrder: { customerDetails: { name: "T W" } },
      seats: 3,
    },
  ];

  const filteredTables = tablesList.filter((table) => {
    if (filterStatus === "all") return true;
    return table.status.toLowerCase() === filterStatus.toLowerCase();
  });

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-10 py-4">
        {/* title | btn back */}
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>

        {/* status filters */}
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setFilterStatus("all")}
            style={{
              backgroundColor:
                filterStatus === "all" ? "#383838" : "transparent",
            }}
            className={`text-lg rounded-lg px-5 py-2 font-semibold transition-colors ${filterStatus === "all" ? "text-[#f5f5f5]" : "text-[#ababab]"}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus("booked")}
            style={{
              backgroundColor:
                filterStatus === "booked" ? "#383838" : "transparent",
            }}
            className={`text-lg rounded-lg px-5 py-2 font-semibold transition-colors ${filterStatus === "booked" ? "text-[#f5f5f5]" : "text-[#ababab]"}`}
          >
            Booked
          </button>
        </div>
      </div>

      {/* Table card */}
      <div className="grid grid-cols-5 gap-3 px-16 py-4 flex-1 min-h-0 overflow-y-scroll scrollbar-hide pb-24">
        {filteredTables.map((table) => {
          return (
            <TableCard
              key={table._id}
              id={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
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
