import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const [dateTime, setDateTime] = useState(new Date());
  // Retrieve the logged-in employee name from the Redux store
  const { name } = useSelector((state) => state.user);

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Determine the time-of-day greeting (Morning, Afternoon, Evening)
  const getGreeting = (date) => {
    const hours = date.getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // format date (Eg: January 08, 2024)
  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}, ${date.getFullYear()}`;
  };

  // format time (Eg: 12:00:00)
  const formatTime = (date) =>
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes(),
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;

  return (
    <div className="bg-bg-card border border-border-color mx-8 px-3 py-3 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-4">
      <div>
        <h1 className="text-text-primary text-2xl font-bold tracking-wide">
          {getGreeting(dateTime)}, {name || "Employee"}
        </h1>
        <p className="text-text-secondary text-sm mt-0.5">
          Give your best services for customers 😀
        </p>
      </div>
      <div className="flex flex-col sm:items-end">
        <h1 className="text-text-primary text-3xl font-extrabold tracking-wide min-w-[140px]">
          {formatTime(dateTime)}
        </h1>
        <p className="text-text-secondary text-sm mt-0.5">
          {formatDate(dateTime)}
        </p>
      </div>
    </div>
  );
};

export default Greetings;
