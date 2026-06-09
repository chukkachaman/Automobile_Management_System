package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceEntityRepository extends JpaRepository<ServiceEntity, Long> {
}
