import React, { useState } from "react";
import moment from "moment";
import { getAvailableBikes } from "../../utils/ApiFunctions";
import BikeSearchResults from "./BikeSearchResult";
import BikeTypeSelector from "./BikeTypeSelector";

const BikeSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    bikeType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [availableBikes, setAvailableBikes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    const checkInMoment = moment(searchQuery.checkInDate);
    const checkOutMoment = moment(searchQuery.checkOutDate);
    if (!checkInMoment.isValid() || !checkOutMoment.isValid()) {
      setErrorMessage("Please enter valid dates");
      return;
    }
    if (!checkOutMoment.isSameOrAfter(checkInMoment)) {
      setErrorMessage("Check-out date must be after check-in date");
      return;
    }
    setIsLoading(true);
    // try {
    //   const response = await getAvailableBikes(
    //     searchQuery.checkInDate,
    //     searchQuery.checkOutDate,
    //     searchQuery.bikeType
    //   );
    //   setAvailableBikes(response.data);
    //   setTimeout(() => setIsLoading(false), 2000);
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchQuery({ ...searchQuery, [name]: value });
    const checkInDate = moment(searchQuery.checkInDate);
    const checkOutDate = moment(searchQuery.checkOutDate);
    if (checkInDate.isValid() && checkOutDate.isValid()) {
      setErrorMessage("");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      bikeType: "",
    });
    setAvailableBikes([]);
  };

  return (
    <>
      <div className="p-5 my-5 mt-5 border border-red-400 shadow">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3">
            <div>
              <label className="block pb-1">Pick-up Date</label>
              <input
                type="date"
                name="checkInDate"
                value={searchQuery.checkInDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block pb-1">Return Date</label>
              <input
                type="date"
                name="checkOutDate"
                value={searchQuery.checkOutDate}
                onChange={handleInputChange}
                min={moment().format("YYYY-MM-DD")}
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <label className="block pb-2 pr-2">Bike Type</label>
              <BikeTypeSelector
                handleBikeInputChange={handleInputChange}
                newBike={searchQuery}
              />
              <button
                type="submit"
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {isLoading ? (
          <p className="mt-4">Finding available bikes....</p>
        ) : availableBikes.length ? (
          <BikeSearchResults
            results={availableBikes}
            onClearSearch={handleClearSearch}
          />
        ) : (
          <p className="pl-4 mt-4">
            No bikes available for the selected dates and bike type.
          </p>
        )}
        {errorMessage && (
          <p className="pl-4 mt-2 text-red-500">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default BikeSearch;
