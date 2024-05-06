import React, { useState, useEffect } from "react";
import { getBikeTypes } from "../../utils/ApiFunctions";

interface Props {
  handleBikeInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newBike: { bikeType: string };
}

const BikeTypeSelector: React.FC<Props> = ({
  handleBikeInputChange,
  newBike,
}) => {
  const [bikeTypes, setBikeTypes] = useState<string[]>([""]);
  const [showNewBikeTypeInput, setShowNewBikeTypeInput] =
    useState<boolean>(false);
  const [newBikeType, setNewBikeType] = useState<string>("");

  useEffect(() => {
    getBikeTypes().then((data: string[]) => {
      setBikeTypes(data);
    });
  }, []);

  const handleNewBikeTypeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewBikeType(e.target.value);
  };

  const handleAddNewBikeType = () => {
    if (newBikeType !== "") {
      setBikeTypes([...bikeTypes, newBikeType]);
      setNewBikeType("");
      setShowNewBikeTypeInput(false);
    }
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    if (e.target.value === "Add New") {
      setShowNewBikeTypeInput(true);
    } else {
      handleBikeInputChange(e as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <>
      {bikeTypes.length > 0 && (
        <div>
          <select
            required
            // className="form-select"
            className="px-3 py-2 leading-tight text-gray-700 border rounded appearance-none form-select focus:outline-none focus:shadow-outline"
            name="bikeType"
            onChange={handleSelectChange}
            value={newBike.bikeType}
          >
            <option value="">Select a bike type</option>
            <option value={"Add New"}>Add New</option>
            {bikeTypes.map((type: string, index: number) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewBikeTypeInput && (
            <div className="mt-2">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  className="w-64 px-3 py-2 leading-tight text-gray-700 border rounded-md focus:outline-none focus:shadow-outline"
                  placeholder="Enter New Bike Type"
                  value={newBikeType}
                  onChange={handleNewBikeTypeInputChange}
                />
                <button
                  className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleAddNewBikeType}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BikeTypeSelector;
