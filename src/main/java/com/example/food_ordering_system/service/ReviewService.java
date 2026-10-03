package com.example.food_ordering_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.food_ordering_system.entity.Review;
import com.example.food_ordering_system.exception.ResourceNotFoundException;
import com.example.food_ordering_system.repository.ReviewRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // CREATE
    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    // READ ALL
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // READ BY ID
    public Review getReviewById(Long id) {

        return reviewRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Review not found with id: " + id
                    )
                );
    }

    // UPDATE
    public Review updateReview(Long id, Review updatedReview) {

        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Review not found with id: " + id
                    )
                );

        existingReview.setUserId(updatedReview.getUserId());
        existingReview.setFoodId(updatedReview.getFoodId());
        existingReview.setRating(updatedReview.getRating());
        existingReview.setComment(updatedReview.getComment());

        return reviewRepository.save(existingReview);
    }

    // DELETE
    public void deleteReview(Long id) {

        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Review not found with id: " + id
                    )
                );

        reviewRepository.delete(existingReview);
    }
}