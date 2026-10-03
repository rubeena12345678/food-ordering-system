package com.example.food_ordering_system.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.food_ordering_system.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}