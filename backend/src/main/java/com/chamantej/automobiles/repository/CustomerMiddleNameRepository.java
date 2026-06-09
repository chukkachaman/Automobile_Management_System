package com.chamantej.automobiles.repository;

import com.chamantej.automobiles.entity.CustomerMiddleName;
import com.chamantej.automobiles.entity.id.CustomerMiddleNameId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerMiddleNameRepository extends JpaRepository<CustomerMiddleName, CustomerMiddleNameId> {
    List<CustomerMiddleName> findByIdCustomerId(Long customerId);
}
