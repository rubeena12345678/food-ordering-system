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

import com.example.food_ordering_system.dto.LoginRequest;
import com.example.food_ordering_system.dto.LoginResponse;
import com.example.food_ordering_system.dto.UserDTO;
import com.example.food_ordering_system.entity.User;
import com.example.food_ordering_system.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    // CREATE USER
    @PostMapping
    public UserDTO addUser(@Valid @RequestBody User user) {
        return userService.addUser(user);
    }


    // LOGIN USER
    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest loginRequest) {

        return userService.login(loginRequest);
    }


    // GET ALL USERS
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }


    // GET USER BY ID
    @GetMapping("/{id}")
    public UserDTO getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }


    // UPDATE USER
    @PutMapping("/{id}")
    public UserDTO updateUser(
            @PathVariable Long id,
            @Valid @RequestBody User user) {

        return userService.updateUser(id, user);
    }


    // DELETE USER
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";
    }
}