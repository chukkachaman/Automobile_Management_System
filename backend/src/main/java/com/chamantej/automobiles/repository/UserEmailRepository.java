package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.UserEmail;
import com.chamantej.automobiles.entity.id.UserEmailId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserEmailRepository extends JpaRepository<UserEmail, UserEmailId> {

    List<UserEmail> findByUser_UserId(Long userId);

    boolean existsByIdEmail(String email);

    void deleteByIdEmail(String email);

    Optional<Object> findByIdEmail(String email);
}
