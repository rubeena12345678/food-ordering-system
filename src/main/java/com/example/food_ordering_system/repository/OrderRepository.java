package com.example.food_ordering_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.food_ordering_system.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}