package com.rentabike.demo.controller;

import com.rentabike.demo.exception.InvalidBookingRequestException;
import com.rentabike.demo.exception.ResourceNotFoundException;
import com.rentabike.demo.model.Bike;
import com.rentabike.demo.model.BookedBike;
import com.rentabike.demo.response.BikeResponse;
import com.rentabike.demo.response.BookingResponse;
import com.rentabike.demo.service.IBikeService;
import com.rentabike.demo.service.IBookingService;
import com.rentabike.demo.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final IBookingService bookingService;
    private final IBikeService bikeService;

    @GetMapping("/all-bookings")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        List<BookedBike> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedBike booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedBike booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }


    @PostMapping("/bike/{bikeId}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable Long bikeId,
                                         @RequestBody BookedBike  bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(bikeId, bookingRequest);
            return ResponseEntity.ok(
                    "Bike booked successfully! Your booking confirmation code is: " + confirmationCode);
        } catch(InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/user/{email}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserEmail(@PathVariable String email) {
        List<BookedBike> bookings = bookingService.getBookingsByUserEmail(email);
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedBike booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable Long bookingId) {
        bookingService.cancelBooking(bookingId);
    }

    private BookingResponse getBookingResponse(BookedBike booking) {
        Bike theBike = bikeService.getBikeById(booking.getBike().getId()).get();
        BikeResponse bike = new BikeResponse(
                theBike.getId(),
                theBike.getBikeType(),
                theBike.getBikePrice(),
                theBike.getBrand(),
                theBike.getModel(),
                theBike.getInfo());
        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(),
                bike);
    }
}
