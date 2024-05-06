import React, { useEffect, useState } from "react";
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt,
  FaBicycle,
  FaMapMarkerAlt,
  // FaHelmetBattle,
  FaWrench,
  FaRoute,
  FaShieldAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getBikeById } from "../../utils/ApiFunctions";
import BookingForm from "./BookingForm";
import BikeCarousel from "../common/BikeCarousel";

interface BikeInfo {
  photo: string;
  bikeType: string;
  bikePrice: number;
  brand?: string;
  model?: string;
}

const Checkout: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bikeInfo, setBikeInfo] = useState<BikeInfo>({
    photo: "",
    bikeType: "",
    bikePrice: 0,
    brand: "",
    model: "",
  });

  const { bikeId } = useParams<{ bikeId: string }>();

  useEffect(() => {
    if (!bikeId) {
      setError("Bike ID is not provided.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await getBikeById(bikeId);
        setBikeInfo(response);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchData();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [bikeId]);

  return (
    <div className="flex flex-col justify-center">
      <section className="container m-4 mx-auto bg-green-300">
        <div className="flex flex-wrap">
          <div className="w-1/3 p-1 mt-5 mb-5 bg-slate-400">
            {isLoading ? (
              <p>Loading bike information...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="flex flex-col justify-center">
                <img
                  src={`data:image/png;base64,${bikeInfo.photo}`}
                  alt="Bike photo"
                  className="h-[180px] object-contain mb-2"
                />
                <div>
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th className="border">Bike Type:</th>
                        <td className="pl-2 border">{bikeInfo.bikeType}</td>
                      </tr>
                      <tr>
                        <th className="border">Brand:</th>
                        <td className="pl-2 border">
                          {bikeInfo.brand} - {bikeInfo.model}
                        </td>
                      </tr>
                      <tr>
                        <th className="border">Price:</th>
                        <td className="pl-2 border">{bikeInfo.bikePrice}€</td>
                      </tr>
                      <tr>
                        <th className="border">Bike Rental Services:</th>
                        <td className="border">
                          <ul className="flex flex-col">
                            <li className="flex items-center mx-2 mt-1 mb-1">
                              <FaBicycle className="mr-1" />{" "}
                              <span className="ml-2 text-xs">
                                Wide selection of bikes for all ages and skill
                                levels{" "}
                              </span>
                            </li>
                            <li className="flex items-center mx-2 mb-1">
                              <FaMapMarkerAlt className="mr-1" />{" "}
                              <span className="ml-2 text-xs">
                                Free delivery and pickup to your location{" "}
                              </span>
                            </li>
                            <li className="flex items-center mx-2 mb-1">
                              <FaWrench className="mr-1" />{" "}
                              <span className="ml-2 text-xs">
                                Maintenance and repair services available{" "}
                              </span>
                            </li>
                            <li className="flex items-center mx-2 mb-1">
                              <FaRoute className="mr-1" />{" "}
                              <span className="ml-2 text-xs">
                                Customized biking routes and maps provided{" "}
                              </span>
                            </li>
                            <li className="flex items-center mx-2 mb-1">
                              <FaShieldAlt className="mr-1" />{" "}
                              <span className="ml-2 text-xs">
                                Insurance options for peace of mind{" "}
                              </span>
                            </li>
                            <li className="flex items-center mx-2 mb-1">
                              <FaPhoneAlt className="mr-1" />{" "}
                              <span className="ml-2 text-xs">
                                24/7 customer support for assistance{" "}
                              </span>
                            </li>

                            {/* <li className="flex items-center mr-4">
                            <FaHelmetBattle className="mr-1" /> Safety gear
                            included with every rental
                          </li> */}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className="w-2/3">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="flex items-center justify-center m-4">
        <BikeCarousel />
      </div>
    </div>
  );
};

export default Checkout;
