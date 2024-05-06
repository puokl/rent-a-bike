import React, { useEffect, useState } from "react";
import { getAllBikes } from "../../utils/ApiFunctions";
import BikeCard from "./BikeCard";
import BikeFilter from "../common/BikeFilter";
import BikePaginator from "../common/BikePaginator";
import { BikeType } from "../../types/types";

const Bike: React.FC = () => {
  const [data, setData] = useState<BikeType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bikesPerPage] = useState<number>(6);
  const [filteredData, setFilteredData] = useState<BikeType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAllBikes();
        setData(data);
        setFilteredData(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading bikes.....</div>;
  }
  if (error) {
    return <div className="text-red-500">Error : {error}</div>;
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / bikesPerPage);

  const renderBikes = () => {
    const startIndex = (currentPage - 1) * bikesPerPage;
    const endIndex = startIndex + bikesPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((bike) => <BikeCard key={bike.id} bike={bike} />);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <BikeFilter data={data} setFilteredData={setFilteredData} />
        </div>
        <div className="flex items-center justify-end md:col-span-1">
          <BikePaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <div className=" bg-slate-600">{renderBikes()}</div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="flex items-center justify-end md:col-span-1">
          <BikePaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Bike;
