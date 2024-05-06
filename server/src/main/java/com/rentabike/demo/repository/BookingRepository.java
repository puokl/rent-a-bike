package com.rentabike.demo.repository;

import com.rentabike.demo.model.BookedBike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<BookedBike, Long> {

    Optional<BookedBike> findByBookingConfirmationCode(String confirmationCode);

    List<BookedBike> findByGuestEmail(String email);

    List<BookedBike> findByBikeId(Long bikeId);
}