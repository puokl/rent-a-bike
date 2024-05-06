package com.rentabike.demo.controller;


import com.rentabike.demo.exception.PhotoRetrievalException;
import com.rentabike.demo.exception.ResourceNotFoundException;
import com.rentabike.demo.model.Bike;
import com.rentabike.demo.model.BookedBike;
import com.rentabike.demo.response.BikeResponse;
import com.rentabike.demo.service.BookingService;
import com.rentabike.demo.service.IBikeService;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bikes")
public class BikeController {
    private final IBikeService bikeService;
    private final BookingService bookingService;

    @PostMapping("/add/new-bike")

    public ResponseEntity<BikeResponse> addNewBike(@RequestParam("bikeType") String bikeType,
                                                   @RequestParam("bikePrice") BigDecimal bikePrice,
                                                   @RequestParam("photo") MultipartFile photo,
                                                   @RequestParam("brand") String brand,
                                                   @RequestParam("model") String model,
                                                   @RequestParam("info") String info) throws SQLException, IOException {
        Bike savedBike = bikeService.addNewBike(bikeType, bikePrice, photo, brand, model, info);
        BikeResponse response = new BikeResponse(savedBike.getId(), savedBike.getBikeType(), savedBike.getBikePrice(), savedBike.getBrand(), savedBike.getModel(), savedBike.getInfo());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/bike/types")
    public List<String> getBikeTypes(){
        return bikeService.getAllBikeTypes();
    }

    @GetMapping("/all-bikes")
    public ResponseEntity<List<BikeResponse>> getAllBikes() throws SQLException {
        List<Bike> bikes = bikeService.getAllBikes();
        List<BikeResponse> bikeResponses = new ArrayList<>();
        for(Bike bike : bikes) {
            byte[] photoBytes = bikeService.getBikePhotoByBikeId(bike.getId());
            if(photoBytes != null && photoBytes.length > 0 ){
                String base64Photo = Base64.encodeBase64String(photoBytes);
                BikeResponse bikeResponse = getBikeResponse(bike);
                bikeResponse.setPhoto(base64Photo);
                bikeResponses.add(bikeResponse);
            }
        }
        return ResponseEntity.ok(bikeResponses);
    }

    @DeleteMapping("/delete/bike/{bikeId}")
    public ResponseEntity<Void> deleteBike(@PathVariable Long bikeId) {
        bikeService.deleteBike(bikeId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{bikeId}")
    public ResponseEntity<BikeResponse> updateBike(@PathVariable Long bikeId,
                                                   @RequestParam(required = false) String bikeType,
                                                   @RequestParam(required = false) BigDecimal bikePrice,
                                                   @RequestParam(required = false) String brand,
                                                   @RequestParam(required = false) String model,
                                                   @RequestParam(required = false) String info,
                                                   @RequestParam(required = false) MultipartFile photo) throws IOException, SQLException {
        byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes() : bikeService.getBikePhotoByBikeId(bikeId);
        Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;
        Bike theBike = bikeService.updateBike(bikeId, bikeType, bikePrice, photoBytes, brand, model, info);
        theBike.setPhoto(photoBlob);
        BikeResponse bikeResponse = getBikeResponse(theBike);
        return ResponseEntity.ok(bikeResponse);
    }

    @GetMapping("/bike/{bikeId}")
    public ResponseEntity<Optional<BikeResponse>> getBikeById(@PathVariable Long bikeId){
        Optional<Bike> theBike = bikeService.getBikeById(bikeId);
        return theBike.map(bike -> {
            BikeResponse bikeResponse = getBikeResponse(bike);
            return ResponseEntity.ok(Optional.of(bikeResponse));
        }).orElseThrow(() -> new ResourceNotFoundException("Bike not found"));
    }

    @GetMapping("/available-bikes")
    public ResponseEntity<List<BikeResponse>> getAvailableBikes(@RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
                                                                @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
                                                                @RequestParam("bikeType") String bikeType) throws SQLException {
        List<Bike> availableBikes = bikeService.getAvailableBikes(checkInDate, checkOutDate, bikeType);
        List<BikeResponse> bikeResponses = new ArrayList<>();
        for (Bike bike : availableBikes) {
            byte[] photoBytes = bikeService.getBikePhotoByBikeId(bike.getId());
            if (photoBytes != null && photoBytes.length > 0) {
                String photoBase64 = Base64.encodeBase64String(photoBytes);
                BikeResponse bikeResponse = getBikeResponse(bike);
                bikeResponse.setPhoto(photoBase64);
                bikeResponses.add(bikeResponse);
            }
        }
        if (bikeResponses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(bikeResponses);
        }
    }

    private BikeResponse getBikeResponse(Bike bike) {
        List<BookedBike> bookings = getAllBookingsByBikeId(bike.getId());
        byte[] photoBytes = null;
        Blob photoBlob = bike.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo");
            }
        }
        return new BikeResponse(bike.getId(),
                bike.getBikeType(), bike.getBikePrice(),
                bike.isBooked(), photoBytes, bike.getBrand(), bike.getModel(), bike.getInfo());
    }

    private List<BookedBike> getAllBookingsByBikeId(Long bikeId) {
        return bookingService.getAllBookingsByBikeId(bikeId);
    }

}
