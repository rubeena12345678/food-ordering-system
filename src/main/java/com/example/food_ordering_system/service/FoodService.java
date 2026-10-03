package com.example.food_ordering_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.food_ordering_system.entity.Food;
import com.example.food_ordering_system.exception.ResourceNotFoundException;
import com.example.food_ordering_system.repository.FoodRepository;

@Service
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodService(FoodRepository foodRepository) {
        this.foodRepository = foodRepository;
    }


    // CREATE
    public Food addFood(Food food) {
        return foodRepository.save(food);
    }


    // READ ALL
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }


    // READ BY ID
    public Food getFoodById(Long id) {

        return foodRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Food not found with id: " + id
                    )
                );
    }


    // UPDATE
    public Food updateFood(Long id, Food updatedFood) {

        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Food not found with id: " + id
                    )
                );

        existingFood.setName(updatedFood.getName());
        existingFood.setDescription(updatedFood.getDescription());
        existingFood.setPrice(updatedFood.getPrice());
        existingFood.setCategory(updatedFood.getCategory());
        existingFood.setAvailable(updatedFood.isAvailable());

        return foodRepository.save(existingFood);
    }


    // DELETE
    public void deleteFood(Long id) {

        Food existingFood = foodRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Food not found with id: " + id
                    )
                );

        foodRepository.delete(existingFood);
    }
}