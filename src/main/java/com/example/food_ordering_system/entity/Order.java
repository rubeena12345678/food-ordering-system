package com.example.food_ordering_system.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Positive(message = "User ID must be greater than 0")
    private Long userId;

    @Positive(message = "Food ID must be greater than 0")
    private Long foodId;

    @Positive(message = "Quantity must be greater than 0")
    private int quantity;

    @Positive(message = "Total price must be greater than 0")
    private double totalPrice;

    @NotBlank(message = "Order status is required")
    private String status;


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


    // Getter and Setter for quantity
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


    // Getter and Setter for totalPrice
    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }


    // Getter and Setter for status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}