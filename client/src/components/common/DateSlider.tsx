import React, { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";

interface DateSliderProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void;
  onFilterChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DateSlider: React.FC<DateSliderProps> = ({
  onDateChange,
  onFilterChange,
}) => {
  const [dateRange, setDateRange] = useState({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const handleSelect = (ranges: any) => {
    console.log("ranges", ranges);
    setDateRange(ranges.selection);
    onDateChange(ranges.selection.startDate, ranges.selection.endDate);
    onFilterChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  const handleClearFilter = () => {
    setDateRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    });
    onDateChange(null, null);
    onFilterChange(null, null);
  };

  return (
    <>
      <h5 className="mb-2">Filter bookings by date</h5>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={handleSelect}
        className="mb-4"
      />
      <button className="btn btn-secondary" onClick={handleClearFilter}>
        Clear Filter
      </button>
    </>
  );
};

export default DateSlider;
