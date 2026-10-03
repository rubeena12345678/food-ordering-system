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

import com.example.food_ordering_system.entity.Category;
import com.example.food_ordering_system.service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    // CREATE
    @PostMapping
    public Category addCategory(@Valid @RequestBody Category category) {
        return categoryService.addCategory(category);
    }


    // READ ALL
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }


    // READ BY ID
    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }


    // UPDATE
    @PutMapping("/{id}")
    public Category updateCategory(
            @PathVariable Long id,
            @Valid @RequestBody Category category) {

        return categoryService.updateCategory(id, category);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable Long id) {

        categoryService.deleteCategory(id);

        return "Category deleted successfully";
    }
}