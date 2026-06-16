import React from "react";

const MiniCard = ({ title, icon, number, footerNum }) => {
  return (
    <div className="bg-bg-secondary border border-border-color py-3 px-4 rounded-lg w-full sm:w-1/2 shadow-sm transition-colors duration-150">
      <div className="flex items-center justify-between">
        <h1 className="text-text-primary text-base font-bold tracking-wide">
          {title}
        </h1>
        <button
          className={`${
            title === "Total Earnings" ? "bg-[#02ca3a]" : "bg-[#f6b100]"
          } p-2 rounded-lg text-white text-lg shrink-0 flex items-center justify-center`}
        >
          {icon}
        </button>
      </div>
      <div className="mt-3">
        <h1 className="text-text-primary text-2xl font-black">
          {title === "Total Earnings" ? `₹${number}` : number}
        </h1>
        <h1 className="text-text-secondary text-xs mt-1">
          <span className="text-[#02ca3a] font-semibold">{footerNum}%</span>{" "}
          than yesterday
        </h1>
      </div>
    </div>
  );
};

export default MiniCard;
