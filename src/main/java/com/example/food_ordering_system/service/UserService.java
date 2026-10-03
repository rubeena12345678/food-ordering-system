package com.example.food_ordering_system.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.food_ordering_system.config.JwtUtil;
import com.example.food_ordering_system.dto.LoginRequest;
import com.example.food_ordering_system.dto.LoginResponse;
import com.example.food_ordering_system.dto.UserDTO;
import com.example.food_ordering_system.entity.User;
import com.example.food_ordering_system.exception.ResourceNotFoundException;
import com.example.food_ordering_system.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Convert User Entity to UserDTO
    private UserDTO convertToDTO(User user) {

        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());

        return dto;
    }

    // CREATE USER
    public UserDTO addUser(User user) {

        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );

        User savedUser = userRepository.save(user);

        return convertToDTO(savedUser);
    }

    // GET ALL USERS
    public List<UserDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // GET USER BY ID
    public UserDTO getUserById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "User not found with id: " + id
                    )
                );

        return convertToDTO(user);
    }

    // UPDATE USER
    public UserDTO updateUser(Long id, User updatedUser) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "User not found with id: " + id
                    )
                );

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());

        existingUser.setPassword(
            passwordEncoder.encode(updatedUser.getPassword())
        );

        User savedUser = userRepository.save(existingUser);

        return convertToDTO(savedUser);
    }

    // LOGIN USER
    public LoginResponse login(LoginRequest loginRequest) {

        User user = userRepository
                .findByEmail(loginRequest.getEmail())
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "Invalid email or password"
                    )
                );

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                user.getPassword())) {

            throw new ResourceNotFoundException(
                "Invalid email or password"
            );
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());

        return new LoginResponse(
                "Login successful",
                user.getId(),
                user.getName(),
                user.getEmail(),
                token
        );
    }

    // DELETE USER
    public void deleteUser(Long id) {

        User existingUser = userRepository.findById(id)
                .orElseThrow(() ->
                    new ResourceNotFoundException(
                        "User not found with id: " + id
                    )
                );

        userRepository.delete(existingUser);
    }
}