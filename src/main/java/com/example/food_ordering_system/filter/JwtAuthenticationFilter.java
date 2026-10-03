package com.example.food_ordering_system.filter;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.food_ordering_system.config.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");

        if (authorizationHeader != null &&
                authorizationHeader.startsWith("Bearer ")) {

            String token =
                    authorizationHeader.substring(7);

            try {

                String email =
                        jwtUtil.getEmailFromToken(token);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                email,
                                null,
                                null
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

            } catch (Exception e) {

                System.out.println("Invalid JWT token");
            }
        }

        filterChain.doFilter(request, response);
    }
}