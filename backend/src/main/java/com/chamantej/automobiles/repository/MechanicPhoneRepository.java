package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.MechanicPhone;
import com.chamantej.automobiles.entity.id.MechanicPhoneId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MechanicPhoneRepository extends JpaRepository<MechanicPhone, MechanicPhoneId> {
}
