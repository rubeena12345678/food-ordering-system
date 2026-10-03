package com.example.food_ordering_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.food_ordering_system.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

}