import React, { useEffect, useState } from "react";
import { deleteBike, getAllBikes } from "../../utils/ApiFunctions";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import BikeFilter from "../common/BikeFilter";
import { BikeType } from "../../types/types";
import BikePaginator from "../common/BikePaginator";

const ExistingBikes = () => {
  const [bikes, setBikes] = useState<BikeType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bikesPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBikes, setFilteredBikes] = useState<BikeType[]>([]);
  const [selectedBikeType, setSelectedBikeType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setIsLoading(true);
    try {
      const result = await getAllBikes();
      setBikes(result);
      setIsLoading(false);
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBikeType === "") {
      setFilteredBikes(bikes);
    } else {
      const filteredBikes = bikes.filter(
        (bike) => bike.bikeType === selectedBikeType
      );
      setFilteredBikes(filteredBikes);
    }
    setCurrentPage(1);
  }, [bikes, selectedBikeType]);

  const handlePaginationClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (bikeId: string) => {
    try {
      const result = await deleteBike(bikeId);
      if (result === "") {
        setSuccessMessage(`Bike No ${bikeId} was deleted`);
        fetchBikes();
      } else {
        console.error(`Error deleting bike: ${result.message}`);
      }
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrorMessage(errorMessage);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = (
    filteredBikes: BikeType[],
    bikesPerPage: number,
    bikes: BikeType[]
  ) => {
    const totalBikes =
      filteredBikes.length > 0 ? filteredBikes.length : bikes.length;
    return Math.ceil(totalBikes / bikesPerPage);
  };

  const indexOfLastBike = currentPage * bikesPerPage;
  const indexOfFirstBike = indexOfLastBike - bikesPerPage;
  const currentRooms = filteredBikes.slice(indexOfFirstBike, indexOfLastBike);

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="p-4 text-green-800 bg-green-100 border border-green-400 rounded-md">
            {successMessage}
          </p>
        )}

        {errorMessage && (
          <p className="p-4 text-red-800 bg-red-100 border border-red-400 rounded-md">
            {errorMessage}
          </p>
        )}
      </div>

      {isLoading ? (
        <p className="m-4">Loading existing bikes</p>
      ) : (
        <>
          <section className="container m-4">
            <div className="flex justify-between mt-5 mb-3 font-bold">
              <h2>Existing Bikes</h2>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="w-full mb-2 md:mb-0 md:w-1/2">
                <BikeFilter data={bikes} setFilteredData={setFilteredBikes} />
              </div>

              <div className="flex justify-end">
                <button
                  // className="px-2 font-bold text-white bg-green-700 rounded hover:bg-green-900 focus:outline-none focus:shadow-outline"
                  className="px-4 py-2 ml-2 text-sm font-medium text-green-600 border border-green-600 rounded hover:bg-green-100 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  type="button"
                >
                  <Link to="/add-bike" className="flex items-center">
                    <FaPlus className="mr-2" /> Add Bike
                  </Link>
                </button>
              </div>
            </div>

            <table className="w-full mt-5 border border-collapse border-gray-400  h-full">
              <thead>
                <tr className="text-center bg-gray-200">
                  <th>ID</th>
                  <th>Bike Type</th>
                  <th>Brand</th>
                  <th>Model</th>
                  <th>Bike Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="">
                {currentRooms.map((bike) => (
                  <tr key={bike.id} className="text-center">
                    <td>{bike.id}</td>
                    <td>{bike.bikeType}</td>
                    <td>{bike.brand}</td>
                    <td>{bike.model}</td>
                    <td>{bike.bikePrice}</td>
                    <td className="flex justify-center gap-6">
                      <div className="flex flex-row">
                        <Link
                          to={`/edit-bike/${bike.id}`}
                          className=" text-blue-500 flex flex-row items-center"
                        >
                          <FaEye />

                          <span className="ml-2">View</span>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="ml-5 text-red-500 flex flex-row items-center"
                          onClick={() => bike.id && handleDelete(bike.id)}
                        >
                          <FaTrashAlt />
                          <span className="ml-2">Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <BikePaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(
                filteredBikes,
                bikesPerPage,
                bikes
              )}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingBikes;
