package com.rentabike.demo.service;

import com.rentabike.demo.model.Bike;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IBikeService {

    List<String> getAllBikeTypes();

    List<Bike> getAllBikes();

    Bike addNewBike(String bikeType, BigDecimal bikePrice, MultipartFile file, String brand, String model, String info) throws SQLException, IOException;

    List<Bike> getAvailableBikes(LocalDate checkInDate, LocalDate checkOutDate, String bikeType);

    byte[] getBikePhotoByBikeId(Long id) throws SQLException;;

    Optional<Bike> getBikeById(Long bikeId);

    Bike updateBike(Long bikeId, String bikeType, BigDecimal bikePrice, byte[] photoBytes, String brand, String model, String info);

    void deleteBike(Long bikeId);
}
