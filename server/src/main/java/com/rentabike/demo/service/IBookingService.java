package com.rentabike.demo.service;



import com.rentabike.demo.model.BookedBike;

import java.util.List;

public interface IBookingService {
    void cancelBooking(Long bookingId);

    List<BookedBike> getAllBookingsByBikeId(Long bikeId);

    String saveBooking(Long bikeId, BookedBike bookingRequest);

    BookedBike findByBookingConfirmationCode(String confirmationCode);

    List<BookedBike> getAllBookings();

    List<BookedBike> getBookingsByUserEmail(String email);



}
