package com.chamantej.automobiles.service;

import com.chamantej.automobiles.dto.UserDTO;
import com.chamantej.automobiles.entity.User;
import com.chamantej.automobiles.exception.ResourceNotFoundException;
import com.chamantej.automobiles.mapper.UserMapper;
import com.chamantej.automobiles.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(UserDTO userDTO) {
        User user = UserMapper.toEntity(userDTO);
        return userRepository.save(user);
    }

    public User updateUser(Long id, UserDTO userDTO) {
        User existing = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));

        // Update fields
        existing.setUsername(userDTO.getUsername());
        existing.setPassword(userDTO.getPassword());
        existing.setRole(userDTO.getRole() != null ? User.Role.valueOf(userDTO.getRole()) : null);
        existing.setFirstName(userDTO.getFirstName());
        existing.setLastName(userDTO.getLastName());
        existing.setHouseNo(userDTO.getHouseNo());
        existing.setStreet(userDTO.getStreet());
        existing.setLocality(userDTO.getLocality());
        existing.setCity(userDTO.getCity());
        existing.setPinCode(userDTO.getPinCode());

        // Replace emails
        existing.getEmails().clear();
        if (userDTO.getEmails() != null) {
            existing.setEmails(UserMapper.toEntity(userDTO).getEmails());
        }

        return userRepository.save(existing);
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username " + username));
    }

    public List<User> getUsersByCity(String city) {
        return userRepository.findByCity(city);
    }

    public List<User> getUsersByRole(User.Role role) {
        return userRepository.findByRole(role);
    }
}
