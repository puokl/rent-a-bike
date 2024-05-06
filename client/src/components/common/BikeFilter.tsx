import React, { useState } from "react";
import { BikeType } from "../../types/types";

interface Props {
  data: BikeType[];
  setFilteredData: React.Dispatch<React.SetStateAction<BikeType[]>>;
}

const BikeFilter: React.FC<Props> = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState<string>("");

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setFilter(selectedType);

    const filteredBikes = data.filter((bike) =>
      bike.bikeType.toLowerCase().includes(selectedType.toLowerCase())
    );
    setFilteredData(filteredBikes);
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const bikeTypes = [
    "",
    ...Array.from(new Set(data.map((bike) => bike.bikeType))),
  ];

  return (
    <div className="flex items-center mb-3">
      {/* <span className="px-3 py-2 text-sm">Filter:</span> */}
      <select
        className="mx-3 form-select border p-2"
        aria-label="bike type filter"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value="">Select a bike type</option>
        {bikeTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button
        // className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        className="px-4 py-2 ml-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        type="button"
        onClick={clearFilter}
      >
        Clear Filter
      </button>
    </div>
  );
};

export default BikeFilter;
