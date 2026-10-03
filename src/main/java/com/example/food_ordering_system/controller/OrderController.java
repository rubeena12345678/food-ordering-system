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

import com.example.food_ordering_system.entity.Order;
import com.example.food_ordering_system.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }


    // CREATE
    @PostMapping
    public Order addOrder(@Valid @RequestBody Order order) {
        return orderService.addOrder(order);
    }


    // READ ALL
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }


    // READ BY ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }


    // UPDATE
    @PutMapping("/{id}")
    public Order updateOrder(
            @PathVariable Long id,
            @Valid @RequestBody Order order) {

        return orderService.updateOrder(id, order);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {

        orderService.deleteOrder(id);

        return "Order deleted successfully";
    }
}