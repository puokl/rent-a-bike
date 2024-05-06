import React from "react";
import { Link } from "react-router-dom";
import { BikeType } from "../../types/types";

interface BikeCardProps {
  bike: BikeType;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike }) => {
  return (
    <div key={bike.id} className="w-full px-2 mb-4">
      <div className="flex overflow-hidden bg-white border rounded-lg shadow-lg">
        <div className="flex-none">
          <Link to={`/rent-bike/${bike.id}`}>
            <img
              className="w-full h-auto max-w-[200px]"
              src={`data:image/png;base64, ${bike.photo}`}
              alt="Bike Photo"
            />
          </Link>
        </div>
        <div className="flex-grow p-4">
          <h3 className="text-lg font-semibold text-yellow-500">
            {bike.bikeType}
          </h3>
          <p>
            {bike.brand} - {bike.model}
          </p>
          <p className="text-sm text-gray-600">{bike.bikePrice} / day</p>
          <p className="text-sm text-gray-700">{bike.info}</p>
        </div>
        <div className="self-start flex-none my-auto">
          <Link
            to={`/rent-bike/${bike.id}`}
            className="block px-4 py-2 mr-4 text-center text-white transition duration-300 bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
