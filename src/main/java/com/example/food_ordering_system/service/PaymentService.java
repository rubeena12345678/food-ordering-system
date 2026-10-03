package com.example.food_ordering_system.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.food_ordering_system.entity.Payment;
import com.example.food_ordering_system.exception.ResourceNotFoundException;
import com.example.food_ordering_system.repository.PaymentRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // CREATE
    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    // READ ALL
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    // READ BY ID
    public Payment getPaymentById(Long id) {

        return paymentRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Payment not found with id: " + id
                    )
                );
    }

    // UPDATE
    public Payment updatePayment(Long id, Payment updatedPayment) {

        Payment existingPayment = paymentRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Payment not found with id: " + id
                    )
                );

        existingPayment.setOrderId(updatedPayment.getOrderId());
        existingPayment.setAmount(updatedPayment.getAmount());
        existingPayment.setPaymentMethod(updatedPayment.getPaymentMethod());
        existingPayment.setPaymentStatus(updatedPayment.getPaymentStatus());

        return paymentRepository.save(existingPayment);
    }

    // DELETE
    public void deletePayment(Long id) {

        Payment existingPayment = paymentRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Payment not found with id: " + id
                    )
                );

        paymentRepository.delete(existingPayment);
    }
}