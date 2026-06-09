package com.chamantej.automobiles.service;

import com.chamantej.automobiles.auth.dto.AuthenticationResponseDTO;
import com.chamantej.automobiles.entity.User;
import com.chamantej.automobiles.exception.DuplicateUsernameException;
import com.chamantej.automobiles.repository.UserRepository;
import com.chamantej.automobiles.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    /**
     * Register a new user
     */
    public User registerUser(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new DuplicateUsernameException(user.getUsername());
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Login user and return JWT token
     */
    public AuthenticationResponseDTO login(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        User dbUser = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String token = jwtUtil.generateToken(dbUser.getUsername(), dbUser.getRole().name());

        return AuthenticationResponseDTO.builder()
                .token(token)
                .userId(dbUser.getUserId())
                .role(dbUser.getRole().name())
                .build();
    }

}