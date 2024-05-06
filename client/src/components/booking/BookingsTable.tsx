import React, { useState, useEffect } from "react";
import { parseISO } from "date-fns";
import DateSlider from "../common/DateSlider";

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

interface Props {
  bookingInfo: Booking[];
  handleBookingCancellation: (bookingId: string) => void;
}

const BookingsTable: React.FC<Props> = ({
  bookingInfo,
  handleBookingCancellation,
}) => {
  const [filteredBookings, setFilteredBookings] =
    useState<Booking[]>(bookingInfo);

  const filterBookings = (startDate: Date | null, endDate: Date | null) => {
    let filtered: Booking[] = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    setFilteredBookings(bookingInfo);
  }, [bookingInfo]);

  return (
    <section className="p-4">
      <DateSlider
        onDateChange={filterBookings}
        onFilterChange={filterBookings}
      />
      <table className="border border-collapse border-gray-400 shadow table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">S/N</th>
            <th className="px-4 py-2">Booking ID</th>
            <th className="px-4 py-2">Room ID</th>
            <th className="px-4 py-2">Room Type</th>
            <th className="px-4 py-2">Check-In Date</th>
            <th className="px-4 py-2">Check-Out Date</th>
            <th className="px-4 py-2">Guest Name</th>
            <th className="px-4 py-2">Guest Email</th>
            <th className="px-4 py-2">Adults</th>
            <th className="px-4 py-2">Children</th>
            <th className="px-4 py-2">Total Guest</th>
            <th className="px-4 py-2">Confirmation Code</th>
            <th className="px-4 py-2" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.map((booking, index) => (
            <tr key={booking.id}>
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{booking.id}</td>
              <td className="px-4 py-2 border">{booking.room.id}</td>
              <td className="px-4 py-2 border">{booking.room.roomType}</td>
              <td className="px-4 py-2 border">{booking.checkInDate}</td>
              <td className="px-4 py-2 border">{booking.checkOutDate}</td>
              <td className="px-4 py-2 border">{booking.guestName}</td>
              <td className="px-4 py-2 border">{booking.guestEmail}</td>
              <td className="px-4 py-2 border">{booking.numOfAdults}</td>
              <td className="px-4 py-2 border">{booking.numOfChildren}</td>
              <td className="px-4 py-2 border">{booking.totalNumOfGuests}</td>
              <td className="px-4 py-2 border">
                {booking.bookingConfirmationCode}
              </td>
              <td className="px-4 py-2 border">
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleBookingCancellation(booking.id)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filteredBookings.length === 0 && (
        <p>No booking found for the selected dates</p>
      )}
    </section>
  );
};

export default BookingsTable;
