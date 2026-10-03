package com.example.food_ordering_system.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.example.food_ordering_system.entity.Address;
import com.example.food_ordering_system.service.AddressService;

@RestController
@RequestMapping("/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }


    // CREATE
    @PostMapping
    public Address addAddress(@Valid @RequestBody Address address) {
        return addressService.addAddress(address);
    }


    // READ ALL
    @GetMapping
    public List<Address> getAllAddresses() {
        return addressService.getAllAddresses();
    }


    // READ BY ID
    @GetMapping("/{id}")
    public Address getAddressById(@PathVariable Long id) {
        return addressService.getAddressById(id);
    }


    // UPDATE
    @PutMapping("/{id}")
    public Address updateAddress(
            @PathVariable Long id,
            @Valid @RequestBody Address address) {

        return addressService.updateAddress(id, address);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public String deleteAddress(@PathVariable Long id) {

        addressService.deleteAddress(id);

        return "Address deleted successfully";
    }
}