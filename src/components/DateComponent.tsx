import { useState, useEffect } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { IoChevronDownOutline } from "react-icons/io5";

type ViewMode = "week" | "month";

interface DateInfo {
  date: number;
  month: number;
  year: number;
  isCurrentDay: boolean;
  isCurrentMonth: boolean;
}

const DateComponent: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<DateInfo[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Generate dates for week or month view
  useEffect(() => {
    if (viewMode === "week") {
      setDates(generateWeekDates(currentDate));
    } else {
      setDates(generateMonthDates(currentDate));
    }
  }, [currentDate, viewMode]);

  // Generate an array of 7 dates for the week view
  const generateWeekDates = (date: Date): DateInfo[] => {
    const result: DateInfo[] = [];
    const today = new Date();

    // Find the Monday of the current week
    const dayOfWeek = date.getDay() || 7; // Convert Sunday (0) to 7
    const mondayDate = new Date(date);
    mondayDate.setDate(date.getDate() - dayOfWeek + 1);

    // Generate 7 days starting from Monday
    for (let i = 0; i < 7; i++) {
      const currentDateToAdd = new Date(mondayDate);
      currentDateToAdd.setDate(mondayDate.getDate() + i);

      result.push({
        date: currentDateToAdd.getDate(),
        month: currentDateToAdd.getMonth(),
        year: currentDateToAdd.getFullYear(),
        isCurrentDay:
          currentDateToAdd.getDate() === today.getDate() &&
          currentDateToAdd.getMonth() === today.getMonth() &&
          currentDateToAdd.getFullYear() === today.getFullYear(),
        isCurrentMonth: currentDateToAdd.getMonth() === date.getMonth(),
      });
    }

    return result;
  };

  // Generate dates for the entire month view
  const generateMonthDates = (date: Date): DateInfo[] => {
    const result: DateInfo[] = [];
    const today = new Date();

    const year = date.getFullYear();
    const month = date.getMonth();

    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay() || 7; // Convert Sunday (0) to 7

    // Add days from previous month to fill the first week
    const daysFromPrevMonth = dayOfWeek - 1;
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const prevMonthDate = new Date(year, month, 1 - i);
      result.push({
        date: prevMonthDate.getDate(),
        month: prevMonthDate.getMonth(),
        year: prevMonthDate.getFullYear(),
        isCurrentDay:
          prevMonthDate.getDate() === today.getDate() &&
          prevMonthDate.getMonth() === today.getMonth() &&
          prevMonthDate.getFullYear() === today.getFullYear(),
        isCurrentMonth: false,
      });
    }

    // Add all days of current month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      result.push({
        date: i,
        month: month,
        year: year,
        isCurrentDay:
          i === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
        isCurrentMonth: true,
      });
    }

    // Add days from next month to complete the grid (up to 42 days for 6 weeks)
    const remainingDays = 42 - result.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      result.push({
        date: nextMonthDate.getDate(),
        month: nextMonthDate.getMonth(),
        year: nextMonthDate.getFullYear(),
        isCurrentDay:
          nextMonthDate.getDate() === today.getDate() &&
          nextMonthDate.getMonth() === today.getMonth() &&
          nextMonthDate.getFullYear() === today.getFullYear(),
        isCurrentMonth: false,
      });
    }

    return result;
  };

  // Navigate to previous week/month
  const handlePrevious = (): void => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next week/month
  const handleNext = (): void => {
    const newDate = new Date(currentDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Format the date range string
  const getDateRangeString = (): string => {
    if (viewMode === "week" && dates.length >= 7) {
      const startDate = new Date(dates[0].year, dates[0].month, dates[0].date);
      const endDate = new Date(dates[6].year, dates[6].month, dates[6].date);

      return `${startDate.getDate()} ${startDate.toLocaleString("default", {
        month: "long",
      })}${
        startDate.getMonth() !== endDate.getMonth() ||
        startDate.getFullYear() !== endDate.getFullYear()
          ? " " + startDate.getFullYear()
          : ""
      } - ${endDate.getDate()} ${endDate.toLocaleString("default", {
        month: "long",
      })} ${endDate.getFullYear()}`;
    } else {
      return `${currentDate.toLocaleString("default", {
        month: "long",
      })} ${currentDate.getFullYear()}`;
    }
  };

  const getDayName = (dateInfo: DateInfo): string => {
    const date = new Date(dateInfo.year, dateInfo.month, dateInfo.date);
    return date.toLocaleString("default", { weekday: "short" });
  };

  return (
    <div className="flex flex-col space-y-4 mt-2 p-2">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center space-x-2">
          <div className="space-x-1">
            <button
              className="bg-[#EDF3FF] p-2 rounded-lg"
              onClick={handlePrevious}
              aria-label="Previous"
            >
              <FcPrevious />
            </button>
            <button
              className="bg-[#EDF3FF] p-2 rounded-lg"
              onClick={handleNext}
              aria-label="Next"
            >
              <FcNext />
            </button>
          </div>
          <p className="text-[#454BE7] font-medium">{getDateRangeString()}</p>
        </div>

        <div className="relative">
          <button
            className="flex justify-between items-center bg-[#EDF3FF] p-2 rounded-lg gap-2 text-[#454BE7]"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <p>{viewMode === "week" ? "Week" : "Month"}</p>
            <IoChevronDownOutline
              className={`transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 bg-white shadow-lg rounded-lg z-10">
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-[#EDF3FF] ${
                  viewMode === "week" ? "bg-[#EDF3FF] text-[#454BE7]" : ""
                }`}
                onClick={() => {
                  setViewMode("week");
                  setDropdownOpen(false);
                }}
              >
                Week
              </button>
              <button
                className={`block w-full text-left px-4 py-2 hover:bg-[#EDF3FF] ${
                  viewMode === "month" ? "bg-[#EDF3FF] text-[#454BE7]" : ""
                }`}
                onClick={() => {
                  setViewMode("month");
                  setDropdownOpen(false);
                }}
              >
                Month
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`grid ${
          viewMode === "week" ? "grid-cols-7" : "grid-cols-7"
        } gap-1`}
      >
        {viewMode === "month" && (
          <>
            <div className="text-center text-gray-500 font-medium">Mon</div>
            <div className="text-center text-gray-500 font-medium">Tue</div>
            <div className="text-center text-gray-500 font-medium">Wed</div>
            <div className="text-center text-gray-500 font-medium">Thu</div>
            <div className="text-center text-gray-500 font-medium">Fri</div>
            <div className="text-center text-gray-500 font-medium">Sat</div>
            <div className="text-center text-gray-500 font-medium">Sun</div>
          </>
        )}

        {dates.map((dateInfo, index) => (
          <div
            key={index}
            className={`text-center p-2 rounded-lg ${
              dateInfo.isCurrentDay
                ? "bg-[#454BE7] text-white"
                : dateInfo.isCurrentMonth
                ? "text-black"
                : "text-gray-400"
            } ${viewMode === "week" ? "flex flex-col items-center" : ""}`}
          >
            {viewMode === "week" && (
              <span className="text-xs mb-1">{getDayName(dateInfo)}</span>
            )}
            <span className={`${viewMode === "week" ? "text-lg" : "text-sm"}`}>
              {dateInfo.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateComponent;
