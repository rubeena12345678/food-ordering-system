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

import com.example.food_ordering_system.entity.Payment;
import com.example.food_ordering_system.service.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }


    // CREATE
    @PostMapping
    public Payment addPayment(@Valid @RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }


    // READ ALL
    @GetMapping
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }


    // READ BY ID
    @GetMapping("/{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }


    // UPDATE
    @PutMapping("/{id}")
    public Payment updatePayment(
            @PathVariable Long id,
            @Valid @RequestBody Payment payment) {

        return paymentService.updatePayment(id, payment);
    }


    // DELETE
    @DeleteMapping("/{id}")
    public String deletePayment(@PathVariable Long id) {

        paymentService.deletePayment(id);

        return "Payment deleted successfully";
    }
}