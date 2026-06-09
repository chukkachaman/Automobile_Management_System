package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.CanDo;
import com.chamantej.automobiles.entity.id.CanDoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CanDoRepository extends JpaRepository<CanDo, CanDoId> {
}
