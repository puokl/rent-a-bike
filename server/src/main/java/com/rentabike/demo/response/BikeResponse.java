package com.rentabike.demo.response;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
public class BikeResponse {

    private Long id;
    private String bikeType;
    private BigDecimal bikePrice;
    private boolean isBooked;
    private String photo;
    private String brand;
    private String model;
    private String info;
    private List<BookingResponse> bookings;

    public BikeResponse(Long id, String bikeType, BigDecimal bikePrice, String brand, String model, String info) {
        this.id = id;
        this.bikeType = bikeType;
        this.bikePrice = bikePrice;
        this.brand = brand;
        this.model = model;
        this.info = info;
    }

    public BikeResponse(Long id, String bikeType, BigDecimal bikePrice, boolean isBooked, byte[] photoBytes, String brand, String model, String info) {
        this.id = id;
        this.bikeType = bikeType;
        this.bikePrice = bikePrice;
        this.brand = brand;
        this.model = model;
        this.info = info;
        this.isBooked = isBooked;
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
    }


}
