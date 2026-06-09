package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.UserMiddleName;
import com.chamantej.automobiles.entity.id.UserMiddleNameId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMiddleNameRepository extends JpaRepository<UserMiddleName, UserMiddleNameId> {

    List<UserMiddleName> findByUser_UserId(Long userId);

    List<UserMiddleName> findByIdMiddleName(String middleName);

    boolean existsByIdUserIdAndIdMiddleName(Long userId, String middleName);

    void deleteByUser_UserId(Long userId);
}
