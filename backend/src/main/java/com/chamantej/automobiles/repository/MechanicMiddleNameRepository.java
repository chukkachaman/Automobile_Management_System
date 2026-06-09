package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.MechanicMiddleName;
import com.chamantej.automobiles.entity.id.MechanicMiddleNameId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MechanicMiddleNameRepository extends JpaRepository<MechanicMiddleName, MechanicMiddleNameId> {
}
