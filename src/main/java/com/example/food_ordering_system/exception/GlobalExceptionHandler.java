package com.example.food_ordering_system.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {


    // Handle validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(
            MethodArgumentNotValidException exception) {

        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult()
                 .getFieldErrors()
                 .forEach(error ->
                     errors.put(
                         error.getField(),
                         error.getDefaultMessage()
                     )
                 );

        return ResponseEntity.badRequest().body(errors);
    }


    // Handle resource not found errors
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleResourceNotFoundException(
            ResourceNotFoundException exception) {

        Map<String, String> error = new HashMap<>();

        error.put("message", exception.getMessage());

        return ResponseEntity.status(404).body(error);
    }
}