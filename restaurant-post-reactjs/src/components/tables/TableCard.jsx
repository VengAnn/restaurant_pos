import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../../redux/slices/customerSlice";
import { getBgColor, getAvatarName } from "../../utils/index";
import { FaPlus } from "react-icons/fa";

const TableCard = ({ id, name, status, initials, seats, bgColor }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = () => {
    dispatch(updateTable({ table: name, tableId: id }));
    navigate("/menu");
  };

  return (
    <div
      onClick={handleCardClick}
      key={id}
      className="w-full hover:bg-bg-card-hover bg-bg-card border border-border-color p-4 rounded-lg cursor-pointer transition-all duration-150 flex flex-col justify-between h-[180px]"
    >
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-text-primary text-base md:text-lg font-bold truncate">
          Table {name}
        </h1>
        <p
          className={`${
            status === "Booked" ? "text-emerald-500 bg-emerald-500/15" : "text-amber-500 bg-amber-500/15"
          } text-[10px] px-2 py-0.5 rounded font-bold shrink-0`}
        >
          {status}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white text-base font-bold shadow"
          style={{ backgroundColor: bgColor || (initials ? getBgColor() : "var(--bg-input)") }}
        >
          {initials ? (
            getAvatarName(initials)
          ) : (
            <FaPlus className="text-text-secondary text-base" />
          )}
        </div>
      </div>
      <p className="text-text-secondary text-xs">
        Seats: <span className="text-text-primary font-bold">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
