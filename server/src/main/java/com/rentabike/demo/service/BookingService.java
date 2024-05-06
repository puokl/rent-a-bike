package com.rentabike.demo.service;


import com.rentabike.demo.exception.InvalidBookingRequestException;
import com.rentabike.demo.exception.ResourceNotFoundException;
import com.rentabike.demo.model.Bike;
import com.rentabike.demo.model.BookedBike;
import com.rentabike.demo.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    private final BookingRepository bookingRepository;
    private final IBikeService bikeService;


    @Override
    public List<BookedBike> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public List<BookedBike> getBookingsByUserEmail(String email) {
        return bookingRepository.findByGuestEmail(email);
    }

    @Override
    public List<BookedBike> getAllBookingsByBikeId(Long bikeId) {
        return bookingRepository.findByBikeId(bikeId);
    }


    @Override
    public String saveBooking(Long bikeId, BookedBike bookingRequest) {
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }
        Bike bike = bikeService.getBikeById(bikeId).get();
        List<BookedBike> existingBookings = bike.getBookings();
        boolean bikeIsAvailable = bikeIsAvailable(bookingRequest, existingBookings);
        if (bikeIsAvailable) {
            bike.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        } else {
            throw new InvalidBookingRequestException("Sorry, this bike is not available for the selected dates");
        }
        return bookingRequest.getBookingConfirmationCode();
    }


    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public BookedBike findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode).orElseThrow(()-> new ResourceNotFoundException("No booking found with booking code: " + confirmationCode));
    }


    private boolean bikeIsAvailable(BookedBike bookingRequest, List<BookedBike> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }



}