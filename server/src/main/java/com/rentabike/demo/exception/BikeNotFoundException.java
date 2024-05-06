package com.rentabike.demo.exception;

public class BikeNotFoundException extends RuntimeException {
    public BikeNotFoundException(String message) {
        super(message);
    }
}
