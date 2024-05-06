import React, { useState, useEffect } from "react";
import { cancelRental, getAllRentals } from "../../utils/ApiFunctions";
import Header from "../common/Header";
import BookingsTable from "./BookingsTable";

interface Booking {
  id: string;
  checkInDate: string;
  checkOutDate: string;
  room: {
    id: string;
    roomType: string;
  };
  guestName: string;
  guestEmail: string;
  numOfAdults: number;
  numOfChildren: number;
  totalNumOfGuests: number;
  bookingConfirmationCode: string;
}

const Bookings: React.FC = () => {
  const [bookingInfo, setBookingInfo] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllRentals();
        setBookingInfo(data);
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
  }, []);

  const handleBookingCancellation = async (bookingId: string) => {
    try {
      await cancelRental(bookingId);
      const data = await getAllRentals();
      setBookingInfo(data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <section className="bg-stone-200">
      <Header title={"Existing Bookings"} />
      {error && <div className="text-red-500">{error}</div>}
      {isLoading ? (
        <div>Loading existing bookings</div>
      ) : (
        <BookingsTable
          bookingInfo={bookingInfo}
          handleBookingCancellation={handleBookingCancellation}
        />
      )}
    </section>
  );
};

export default Bookings;
