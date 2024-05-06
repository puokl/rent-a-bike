import React, { useEffect, useState } from "react";
import BikeCard from "../bike/BikeCard";
import BikePaginator from "./BikePaginator";

interface BikeSearchResultsProps {
  results: any[];
  onClearSearch: () => void;
}

const BikeSearchResults: React.FC<BikeSearchResultsProps> = ({
  results,
  onClearSearch,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3;
  const totalResults = results.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const paginatedResults = results.slice(startIndex, endIndex);

  useEffect(() => {
    console.log("results", results);
  }, []);

  return (
    <div>
      {results.length > 0 ? (
        <>
          <h5 className="my-5 font-bold text-center">Search Results</h5>
          <div className="flex flex-wrap justify-center">
            {paginatedResults.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            {totalResults > resultsPerPage && (
              <BikePaginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
            <button
              className="px-4 py-2 ml-4 text-white bg-gray-800 rounded-md"
              onClick={onClearSearch}
            >
              Clear Search
            </button>
          </div>
        </>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default BikeSearchResults;
