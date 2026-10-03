package com.example.food_ordering_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;

@Entity
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "User ID must be greater than 0")
    private Long userId;

    @NotBlank(message = "House number is required")
    private String houseNo;

    @NotBlank(message = "Street is required")
    private String street;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "Pincode is required")
    @Pattern(
        regexp = "^[0-9]{6}$",
        message = "Pincode must contain exactly 6 digits"
    )
    private String pincode;


    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // Getter and Setter for userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    // Getter and Setter for houseNo
    public String getHouseNo() {
        return houseNo;
    }

    public void setHouseNo(String houseNo) {
        this.houseNo = houseNo;
    }


    // Getter and Setter for street
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }


    // Getter and Setter for city
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }


    // Getter and Setter for state
    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }


    // Getter and Setter for pincode
    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
    }
}