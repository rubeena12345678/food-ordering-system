package com.example.food_ordering_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.food_ordering_system.entity.Address;
import com.example.food_ordering_system.exception.ResourceNotFoundException;
import com.example.food_ordering_system.repository.AddressRepository;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    // CREATE
    public Address addAddress(Address address) {
        return addressRepository.save(address);
    }

    // READ ALL
    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    // READ BY ID
    public Address getAddressById(Long id) {

        return addressRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Address not found with id: " + id
                    )
                );
    }

    // UPDATE
    public Address updateAddress(Long id, Address updatedAddress) {

        Address existingAddress = addressRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Address not found with id: " + id
                    )
                );

        existingAddress.setUserId(updatedAddress.getUserId());
        existingAddress.setHouseNo(updatedAddress.getHouseNo());
        existingAddress.setStreet(updatedAddress.getStreet());
        existingAddress.setCity(updatedAddress.getCity());
        existingAddress.setState(updatedAddress.getState());
        existingAddress.setPincode(updatedAddress.getPincode());

        return addressRepository.save(existingAddress);
    }

    // DELETE
    public void deleteAddress(Long id) {

        Address existingAddress = addressRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Address not found with id: " + id
                    )
                );

        addressRepository.delete(existingAddress);
    }
}