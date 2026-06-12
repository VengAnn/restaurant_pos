import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { getBgColor, getAvatarName } from "../../utils/index";

const TableCard = ({ id, name, status, initials, seats, bgColor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(updateTable({ table: name }));
    navigate("/menu");
  };

  return (
    <div
      onClick={handleCardClick}
      key={id}
      className="w-full hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer"
    >
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">
          Table {name}
        </h1>
        <p
          className={`${status === "Booked" ? "text-[#02ca3a] bg-[#2e4a40]" : "text-[#f6b100] bg-[#664a04]"} text-xs px-2 py-1 rounded-md font-semibold`}
        >
          {status}
        </p>
      </div>
      <div className="flex items-center justify-center mt-5 mb-8">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
          style={{ backgroundColor: bgColor || (initials ? getBgColor() : "#1f1f1f") }}
        >
          {getAvatarName(initials) || "N/A"}
        </div>
      </div>
      <p className="text-[#ababab] text-xs">
        Seats: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
