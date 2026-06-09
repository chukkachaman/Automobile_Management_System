package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.Required;
import com.chamantej.automobiles.entity.id.RequiredId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequiredRepository extends JpaRepository<Required, RequiredId> {
}
