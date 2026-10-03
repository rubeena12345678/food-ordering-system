package com.example.food_ordering_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.food_ordering_system.entity.Order;
import com.example.food_ordering_system.exception.ResourceNotFoundException;
import com.example.food_ordering_system.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // CREATE
    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    // READ ALL
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // READ BY ID
    public Order getOrderById(Long id) {

        return orderRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Order not found with id: " + id
                    )
                );
    }

    // UPDATE
    public Order updateOrder(Long id, Order updatedOrder) {

        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Order not found with id: " + id
                    )
                );

        existingOrder.setUserId(updatedOrder.getUserId());
        existingOrder.setFoodId(updatedOrder.getFoodId());
        existingOrder.setQuantity(updatedOrder.getQuantity());
        existingOrder.setTotalPrice(updatedOrder.getTotalPrice());
        existingOrder.setStatus(updatedOrder.getStatus());

        return orderRepository.save(existingOrder);
    }

    // DELETE
    public void deleteOrder(Long id) {

        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Order not found with id: " + id
                    )
                );

        orderRepository.delete(existingOrder);
    }
}