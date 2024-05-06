import React, { useEffect, useState } from "react";
import moment from "moment";
import BookingSummary from "./BookingSummary";
import { rentBike, getBikeById } from "../../utils/ApiFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { error } from "console";
// import { useAuth } from "../auth/AuthProvider";

interface BookingFormProps {}

const BookingForm: React.FC<BookingFormProps> = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [bikePrice, setBikePrice] = useState(0);

  const currentUser = localStorage.getItem("userId");

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: currentUser,
    // guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numOfAdults: "",
    numOfChildren: "",
  });

  const { bikeId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const getBikePriceById = async (bikeId: string) => {
    try {
      const response = await getBikeById(bikeId);
      setBikePrice(response.bikePrice);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (bikeId) {
      getBikePriceById(bikeId);
    }
  }, [bikeId]);

  // const calculatePayment = () => {
  //   const checkInDate = moment(booking.checkInDate);
  //   const checkOutDate = moment(booking.checkOutDate);
  //   const diffInDays = checkOutDate.diff(checkInDate, "days");
  //   const paymentPerDay = roomPrice ? roomPrice : 0;
  //   return diffInDays * paymentPerDay;
  // };

  const calculatePayment = () => {
    const rentalStartDate = moment(booking.checkInDate);
    const rentalEndDate = moment(booking.checkOutDate);
    const diffInDays = rentalEndDate.diff(rentalStartDate, "days");
    const paymentPerDay = bikePrice ? bikePrice : 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numOfAdults);
    const childrenCount = parseInt(booking.numOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must be after check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      if (bikeId) {
        const confirmationCode = await rentBike(bikeId, booking);
        setIsSubmitted(true);
        navigate("/booking-success", { state: { message: confirmationCode } });
      } else {
        throw new Error("Bike ID is undefined");
      }
    } catch (error: any) {
      const errorMessage = error.message;
      console.log(errorMessage);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <>
      <div className="flex flex-row bg-yellow-300">
        <div className="w-1/2 h-full p-1 pl-2 m-1 border border-teal-800 rounded-xl">
          <h2 className="my-1 text-lg font-bold">Rent a Bike</h2>
          <form noValidate className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="guestFullName"
                className="block text-sm font-medium text-gray-700"
              >
                Fullname
              </label>
              <input
                required
                type="text"
                id="guestFullName"
                name="guestFullName"
                value={booking.guestFullName}
                placeholder="Enter your fullname"
                onChange={handleInputChange}
                className="block w-5/6 py-1 pl-2 mt-1 border-2 rounded-md form-input"
              />
              <p className="text-red-500">
                {validated &&
                  !booking.guestFullName &&
                  "Please enter your fullname."}
              </p>
            </div>
            <div>
              <label
                htmlFor="guestEmail"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="guestEmail"
                name="guestEmail"
                value={booking.guestEmail || ""}
                placeholder="Enter your email"
                onChange={handleInputChange}
                disabled
                className="block w-5/6 py-1 pl-2 mt-1 border-2 rounded-md form-input"
              />
              <p className="text-red-500">
                {validated &&
                  !booking.guestEmail &&
                  "Please enter a valid email address."}
              </p>
            </div>
            <fieldset className="p-3 border border-gray-200 rounded">
              <legend className="block text-sm font-medium text-gray-700">
                Rental Period
              </legend>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="checkInDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Date
                  </label>
                  <input
                    required
                    type="date"
                    id="checkInDate"
                    name="checkInDate"
                    value={booking.checkInDate}
                    placeholder="Start Date"
                    min={moment().format("YYYY-MM-DD")}
                    onChange={handleInputChange}
                    className="block w-4/5 py-1 pl-2 mt-1 border-2 rounded-md form-input"
                  />
                  <p className="text-red-500">
                    {validated &&
                      !booking.checkInDate &&
                      "Please select a start date."}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="checkOutDate"
                    className="block text-sm font-medium text-gray-70"
                  >
                    End Date
                  </label>
                  <input
                    required
                    type="date"
                    id="checkOutDate"
                    name="checkOutDate"
                    value={booking.checkOutDate}
                    placeholder="End Date"
                    min={moment().format("YYYY-MM-DD")}
                    onChange={handleInputChange}
                    className="block w-4/5 py-1 pl-2 mt-1 border-2 rounded-md form-input"
                  />
                  <p className="text-red-500">
                    {validated &&
                      !booking.checkOutDate &&
                      "Please select an end date."}
                  </p>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
            </fieldset>

            <fieldset className="p-3 border border-gray-200 rounded">
              <legend className="block text-sm font-medium text-gray-700">
                Number of Riders
              </legend>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="numOfAdults"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Adults
                  </label>
                  <input
                    required
                    type="number"
                    id="numOfAdults"
                    name="numOfAdults"
                    value={booking.numOfAdults}
                    min={1}
                    placeholder="0"
                    onChange={handleInputChange}
                    className="block w-1/3 py-1 pl-2 mt-1 border-2 rounded-md form-input"
                  />
                  <p className="text-red-500">
                    {validated &&
                      !booking.numOfAdults &&
                      "Please select at least 1 adult."}
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="numOfChildren"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Children
                  </label>
                  <input
                    required
                    type="number"
                    id="numOfChildren"
                    name="numOfChildren"
                    value={booking.numOfChildren}
                    placeholder="0"
                    min={0}
                    onChange={handleInputChange}
                    className="block w-1/3 py-1 pl-2 mt-1 border-2 rounded-md form-input"
                  />
                  <p className="text-red-500">
                    {validated &&
                      !booking.numOfChildren &&
                      "Select 0 if no children"}
                  </p>
                </div>
              </div>
            </fieldset>

            <div className="mt-2 mb-2 fom-group">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-white bg-red-300 rounded hover:bg-red-500"
              >
                Rent Now
              </button>
            </div>
          </form>
        </div>

        <div className="w-1/2 m-1">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleFormSubmit}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BookingForm;
