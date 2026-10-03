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

import com.example.food_ordering_system.entity.Cart;
import com.example.food_ordering_system.service.CartService;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }


    // CREATE
    @PostMapping
    public Cart addCart(@Valid @RequestBody Cart cart) {
        return cartService.addCart(cart);
    }


    // READ ALL
    @GetMapping
    public List<Cart> getAllCarts() {
        return cartService.getAllCarts();
    }


    // READ BY ID
    @GetMapping("/{id}")
    public Cart getCartById(@PathVariable Long id) {
        return cartService.getCartById(id);
    }


    // UPDATE
    @PutMapping("/{id}")
    public Cart updateCart(
            @PathVariable Long id,
            @Valid @RequestBody Cart cart) {

        return cartService.updateCart(id, cart);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public String deleteCart(@PathVariable Long id) {

        cartService.deleteCart(id);

        return "Cart deleted successfully";
    }
}