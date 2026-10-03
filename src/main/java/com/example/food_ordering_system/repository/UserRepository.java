package com.example.food_ordering_system.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.food_ordering_system.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
}