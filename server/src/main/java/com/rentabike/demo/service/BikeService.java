package com.rentabike.demo.service;

import com.rentabike.demo.exception.BikeNotFoundException;
import com.rentabike.demo.exception.InternalServerException;
import com.rentabike.demo.exception.ResourceNotFoundException;
import com.rentabike.demo.model.Bike;
import com.rentabike.demo.repository.BikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BikeService implements IBikeService {

    private final BikeRepository bikeRepository;

    @Override
    public List<String> getAllBikeTypes() {
        return bikeRepository.findDistinctBikeTypes();
    }

    @Override
    public List<Bike> getAllBikes() {
        return bikeRepository.findAll();
    }

    @Override
    public Bike addNewBike(String bikeType, BigDecimal bikePrice, MultipartFile file, String brand, String model, String info) throws SQLException, IOException {
        Bike bike = new Bike();
        bike.setBikeType(bikeType);
        bike.setBikePrice(bikePrice);
        bike.setBrand(standardizeText(brand));
        bike.setModel(standardizeText(model));
        bike.setInfo(info);
        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            bike.setPhoto(photoBlob);
        }
        return bikeRepository.save(bike);

    }

    private String standardizeText(String text) {
        return text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();

    }

    @Override
    public List<Bike> getAvailableBikes(LocalDate checkInDate, LocalDate checkOutDate, String bikeType) {
        return bikeRepository.findAvailableBikesByDatesAndType(checkInDate, checkOutDate, bikeType);
    }


    @Override
    public byte[] getBikePhotoByBikeId(Long bikeId) throws SQLException {
        Optional<Bike> theBike = bikeRepository.findById(bikeId);
        if (theBike.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, Bike not found!");
        }
        Blob photoBlob = theBike.get().getPhoto();
        if (photoBlob != null) {
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }
        return null;
    }

    @Override
    public Optional<Bike> getBikeById(Long bikeId) {
        Optional<Bike> optionalBike = bikeRepository.findById(bikeId);
        if (optionalBike.isPresent()) {
            return optionalBike;
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Bike updateBike(Long bikeId, String bikeType, BigDecimal bikePrice, byte[] photoBytes, String brand, String model, String info) {
        Bike bike = bikeRepository.findById(bikeId)
                .orElseThrow(() -> new ResourceNotFoundException("Bike not found"));
        if (bikeType != null) bike.setBikeType(bikeType);
        if (bikePrice != null) bike.setBikePrice(bikePrice);
        if (brand != null) bike.setBrand(brand);
        if (model != null) bike.setModel(model);
        if (info != null) bike.setInfo(info);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                bike.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException ex) {
                throw new InternalServerException("Error updating bike");
            }
        }
        return bikeRepository.save(bike);
    }

    @Override
    public void deleteBike(Long bikeId) {
        Optional<Bike> theBike = bikeRepository.findById(bikeId);
        if (theBike.isEmpty()) {
            throw new BikeNotFoundException("Bike with id " + bikeId + " not found");
        }
        bikeRepository.deleteById(bikeId);
    }


}
