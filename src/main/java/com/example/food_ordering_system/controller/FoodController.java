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

import com.example.food_ordering_system.entity.Food;
import com.example.food_ordering_system.service.FoodService;

@RestController
@RequestMapping("/foods")
public class FoodController {

    private final FoodService foodService;

    public FoodController(FoodService foodService) {
        this.foodService = foodService;
    }

    // CREATE - Add Food
    @PostMapping
    public Food addFood(@Valid @RequestBody Food food) {
        return foodService.addFood(food);
    }

    // READ - Get All Foods
    @GetMapping
    public List<Food> getAllFoods() {
        return foodService.getAllFoods();
    }

    // READ - Get Food By ID
    @GetMapping("/{id}")
    public Food getFoodById(@PathVariable Long id) {
        return foodService.getFoodById(id);
    }

    // UPDATE - Update Food
    @PutMapping("/{id}")
    public Food updateFood(@PathVariable Long id,
                           @RequestBody Food food) {
        return foodService.updateFood(id, food);
    }

    // DELETE - Delete Food
    @DeleteMapping("/{id}")
    public String deleteFood(@PathVariable Long id) {
        foodService.deleteFood(id);
        return "Food deleted successfully";
    }
}