package com.rentabike.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.RandomStringUtils;

import java.math.BigDecimal;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
public class Bike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String bikeType;
    private BigDecimal bikePrice;
    private String brand;
    private String model;
    private String info;
    private boolean isBooked = false;

    @Lob
    private Blob photo;
    @OneToMany(mappedBy="bike", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BookedBike> bookings;

    public Bike()
    {
        this.bookings = new ArrayList<>();
    }

    public void addBooking(BookedBike booking) {
        if(bookings == null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setBike(this);
        isBooked = true;
        String bookingCode = RandomStringUtils.randomNumeric(10);
        booking.setBookingConfirmationCode(bookingCode);
    }

}
