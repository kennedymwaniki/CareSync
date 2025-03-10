/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

interface DateInfo {
  date: number;
  isCurrentDay: boolean;
}

const MiniDateComponent: React.FC = () => {
  const [currentDate, _setCurrentDate] = useState<Date>(new Date());
  const [weekDays, setWeekDays] = useState<DateInfo[]>([]);

  // Get formatted month and year
  const monthYearDisplay = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Days of the week
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    generateWeekDays();
  }, []);

  const generateWeekDays = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.

    // Convert to Monday-based index (0 is Monday, 6 is Sunday)
    const mondayBasedIndex = currentDay === 0 ? 6 : currentDay - 1;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - mondayBasedIndex);

    const days: DateInfo[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      days.push({
        date: day.getDate(),
        isCurrentDay:
          day.getDate() === today.getDate() &&
          day.getMonth() === today.getMonth() &&
          day.getFullYear() === today.getFullYear(),
      });
    }

    setWeekDays(days);
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-4 shadow-sm">
      {/* Month and year display */}
      <div className="text-xl font-semibold mb-4 text-center">
        {monthYearDisplay}
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-1 mb-1">
        {daysOfWeek.map((day, index) => (
          <div
            key={`day-${index}`}
            className="text-center text-sm py-1 font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Date numbers */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, index) => (
          <div
            key={`date-${index}`}
            className={`
              flex items-center justify-center rounded-lg py-3
              ${
                day.isCurrentDay
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }
            `}
          >
            {day.date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniDateComponent;
