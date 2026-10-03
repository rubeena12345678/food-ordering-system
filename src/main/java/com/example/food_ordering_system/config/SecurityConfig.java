package com.example.food_ordering_system.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.food_ordering_system.filter.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtil);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .formLogin(form -> form.disable())

            .httpBasic(basic -> basic.disable())

            .authorizeHttpRequests(auth -> auth

                .requestMatchers(
                    "/",
                    "/index.html",
                    "/login.html",
                    "/register.html",
                    "/foods.html",
                    "/cart.html",
                    "/checkout.html",
                    "/payment.html",
                    "/order-confirmation.html",
                    "/orders.html",
                    "/error"
                ).permitAll()

                .requestMatchers(
                    "/css/**",
                    "/js/**",
                    "/images/**",
                    "/favicon.ico"
                ).permitAll()

                .requestMatchers(
                    "/users",
                    "/users/login"
                ).permitAll()

                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter(),
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}