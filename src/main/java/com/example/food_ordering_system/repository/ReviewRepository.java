package com.example.food_ordering_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.food_ordering_system.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

}