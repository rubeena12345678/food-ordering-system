package com.example.food_ordering_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.food_ordering_system.entity.Cart;
import com.example.food_ordering_system.exception.ResourceNotFoundException;
import com.example.food_ordering_system.repository.CartRepository;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // CREATE
    public Cart addCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // READ ALL
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    // READ BY ID
    public Cart getCartById(Long id) {

        return cartRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Cart not found with id: " + id
                    )
                );
    }

    // UPDATE
    public Cart updateCart(Long id, Cart updatedCart) {

        Cart existingCart = cartRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Cart not found with id: " + id
                    )
                );

        existingCart.setUserId(updatedCart.getUserId());
        existingCart.setFoodId(updatedCart.getFoodId());
        existingCart.setQuantity(updatedCart.getQuantity());

        return cartRepository.save(existingCart);
    }

    // DELETE
    public void deleteCart(Long id) {

        Cart existingCart = cartRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Cart not found with id: " + id
                    )
                );

        cartRepository.delete(existingCart);
    }
}