package com.example.food_ordering_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.food_ordering_system.entity.Category;
import com.example.food_ordering_system.exception.ResourceNotFoundException;
import com.example.food_ordering_system.repository.CategoryRepository;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // CREATE
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    // READ ALL
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // READ BY ID
    public Category getCategoryById(Long id) {

        return categoryRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Category not found with id: " + id
                    )
                );
    }

    // UPDATE
    public Category updateCategory(Long id, Category updatedCategory) {

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Category not found with id: " + id
                    )
                );

        existingCategory.setName(updatedCategory.getName());
        existingCategory.setDescription(updatedCategory.getDescription());

        return categoryRepository.save(existingCategory);
    }

    // DELETE
    public void deleteCategory(Long id) {

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Category not found with id: " + id
                    )
                );

        categoryRepository.delete(existingCategory);
    }
}