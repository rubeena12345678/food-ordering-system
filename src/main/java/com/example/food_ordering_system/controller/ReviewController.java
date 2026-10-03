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

import com.example.food_ordering_system.entity.Review;
import com.example.food_ordering_system.service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }


    // CREATE
    @PostMapping
    public Review addReview(@Valid @RequestBody Review review) {
        return reviewService.addReview(review);
    }


    // READ ALL
    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }


    // READ BY ID
    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable Long id) {
        return reviewService.getReviewById(id);
    }


    // UPDATE
    @PutMapping("/{id}")
    public Review updateReview(
            @PathVariable Long id,
            @Valid @RequestBody Review review) {

        return reviewService.updateReview(id, review);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {

        reviewService.deleteReview(id);

        return "Review deleted successfully";
    }
}