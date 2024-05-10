import React, { useEffect, useState } from "react";
import { getAllBikes } from "../../utils/ApiFunctions";
import { Link } from "react-router-dom";

interface Bike {
  id: string;
  bikeType: string;
  bikePrice: string;
  photo: string;
  brand?: string;
  model?: string;
}

const BikeCarousel: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([
    {
      id: "",
      bikeType: "",
      bikePrice: "",
      photo: "",
    },
  ]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        setIsLoading(true);
        const data = await getAllBikes();
        setBikes(data);
        setIsLoading(false);
      } catch (error: any) {
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bikes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bikes.length - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return <div className="mt-5">Loading bikes....</div>;
  }
  if (errorMessage) {
    return <div className="mt-5 mb-5 text-red-600">Error : {errorMessage}</div>;
  }

  return (
    <section className="relative mt-5 mb-5 overflow-hidden bg-gray-200 shadow">
      <div
        className="absolute z-10 transform -translate-y-1/2 cursor-pointer left-2 top-1/2"
        onClick={handlePrev}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 font-bold text-gray-700 transition duration-300 hover:text-gray-900"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.78 10.78a.75.75 0 0 1 0-1.06l3.47-3.47a.75.75 0 1 1 1.06 1.06L10.56 10l1.75 1.75a.75.75 0 1 1-1.06 1.06l-3.47-3.5a.75.75 0 0 1 0-1.06z"
          />
        </svg>
      </div>
      <div
        className="absolute z-10 transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
        onClick={handleNext}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-12 h-12 font-bold text-gray-700 transition duration-300 hover:text-gray-900"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.78 9.28a.75.75 0 0 1 1.06 0l3.47 3.47a.75.75 0 0 1 0 1.06l-3.47 3.47a.75.75 0 1 1-1.06-1.06l2.72-2.72-2.72-2.72a.75.75 0 0 1 0-1.06z"
          />
        </svg>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out transform"
          style={{
            width: `${bikes.length * 20}%`,
            transform: `translateX(-${(100 / bikes.length) * currentIndex}%)`,
          }}
        >
          {bikes.map((bike) => (
            <div key={bike.id} className="w-full px-2 md:w-1/5">
              <div className="overflow-hidden border border-gray-300 rounded-md shadow-md">
                <Link to={`/rent-bike/${bike.id}`}>
                  <img
                    src={`data:image/png;base64, ${bike.photo}`}
                    alt="Bike Photo"
                    className="object-cover w-full h-48"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    {bike.bikeType}
                  </h3>
                  <h4>
                    {bike.brand} - {bike.model}
                  </h4>
                  <p className="text-gray-700 mb-2">${bike.bikePrice}/day</p>
                  <Link
                    to={`/rent-bike/${bike.id}`}
                    // className="inline-block px-2 py-1 mt-2 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
                    className="w-1/3 px-2 py-1 mt-4 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Rent Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BikeCarousel;
