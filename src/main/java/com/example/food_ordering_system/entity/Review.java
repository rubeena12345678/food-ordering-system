package com.example.food_ordering_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "User ID must be greater than 0")
    private Long userId;

    @Positive(message = "Food ID must be greater than 0")
    private Long foodId;

    @Positive(message = "Rating must be greater than 0")
    @Max(value = 5, message = "Rating cannot be greater than 5")
    private int rating;

    @NotBlank(message = "Comment is required")
    private String comment;


    // Getter and Setter for id
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    // Getter and Setter for userId
    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    // Getter and Setter for foodId
    public Long getFoodId() {
        return foodId;
    }

    public void setFoodId(Long foodId) {
        this.foodId = foodId;
    }


    // Getter and Setter for rating
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }


    // Getter and Setter for comment
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}