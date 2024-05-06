package com.rentabike.demo.repository;

import com.rentabike.demo.model.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BikeRepository extends JpaRepository<Bike, Long> {
    @Query("SELECT DISTINCT r.bikeType FROM Bike r")
    List<String> findDistinctBikeTypes();

    @Query(" SELECT r FROM Bike r " +
            " WHERE r.bikeType LIKE %:bikeType% " +
            " AND r.id NOT IN (" +
            "  SELECT br.bike.id FROM BookedBike br " +
            "  WHERE ((br.checkInDate <= :checkOutDate) AND (br.checkOutDate >= :checkInDate))" +
            ")")
    List<Bike> findAvailableBikesByDatesAndType(LocalDate checkInDate, LocalDate checkOutDate, String bikeType);
}